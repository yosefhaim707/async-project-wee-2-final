import { createSavedItem } from "./savedItemFactory.js";
import { calculateCollectionStats } from "./stats.js";

export function createCollectionManager({
  generateItemId,
  storage,
  apiClient,
  apiConfig,
}) {
  let items = [];

  async function load() {
    items = await storage.read();
  }

  async function save() {
    await storage.write(items);
  }

  async function createItem(data) {
    const cleanData = validateItemData(data);
    const item = createSavedItem({
      id: generateItemId(),
      userId: data.userId,
      sourceApi: "Manual",
      itemType: "manual",
      ...cleanData,
    });

    items = [...items, item];
    await save();
    return item;
  }

  async function importItemFromExternalApi(data) {
    if (!data.externalId && !data.externalItem) {
      throw createError(400, "externalId or externalItem is required");
    }

    const externalItem = data.externalItem
      ? normalizeProvidedExternalItem(data.externalItem)
      : await apiClient.getExternalItemById(data.externalId);

    const alreadySaved = items.some((item) => (
      item.userId === data.userId
      && item.sourceApi === apiConfig.apiName
      && item.externalId === externalItem.externalId
    ));

    if (alreadySaved) {
      throw createError(409, "This external item is already saved");
    }

    const cleanData = validateItemData({
      ...data,
      title: externalItem.title,
      description: externalItem.description,
    });

    const item = createSavedItem({
      id: generateItemId(),
      userId: data.userId,
      sourceApi: apiConfig.apiName,
      itemType: apiConfig.itemType,
      externalId: externalItem.externalId,
      title: externalItem.title,
      description: externalItem.description,
      status: cleanData.status,
      priority: cleanData.priority,
      tags: cleanData.tags,
      notes: cleanData.notes,
      rawData: externalItem.rawData ?? externalItem,
    });

    items = [...items, item];
    await save();
    return item;
  }

  function getAllItems(filters = {}) {
    return items
      .filter((item) => item.userId === filters.userId)
      .filter((item) => !filters.status || item.status === filters.status)
      .filter((item) => (
        !filters.priority || item.priority === Number(filters.priority)
      ))
      .filter((item) => (
        !filters.tag || item.tags.includes(filters.tag)
      ))
      .filter((item) => {
        if (!filters.search) {
          return true;
        }

        const search = filters.search.toLowerCase();
        const searchableText = [
          item.title,
          item.description,
          item.notes,
          item.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(search);
      });
  }

  function getItemById(itemId, userId) {
    const item = items.find((savedItem) => (
      savedItem.id === itemId && savedItem.userId === userId
    ));

    if (!item) {
      throw createError(404, "Item not found");
    }

    return item;
  }

  async function updateItem(itemId, updates, userId) {
    const item = getItemById(itemId, userId);
    const blockedFields = ["id", "userId", "createdAt"];
    const blockedField = blockedFields.find((field) => field in updates);

    if (blockedField) {
      throw createError(400, `${blockedField} cannot be updated`);
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "tags",
      "notes",
    ];
    const cleanUpdates = {};

    allowedFields.forEach((field) => {
      if (field in updates) {
        cleanUpdates[field] = updates[field];
      }
    });

    validateItemData({
      ...item,
      ...cleanUpdates,
      userId,
    });

    const updatedItem = {
      ...item,
      ...cleanAllowedUpdates(cleanUpdates),
      updatedAt: new Date().toISOString(),
    };

    items = items.map((savedItem) => (
      savedItem.id === itemId && savedItem.userId === userId
        ? updatedItem
        : savedItem
    ));

    await save();
    return updatedItem;
  }

  async function deleteItem(itemId, userId) {
    const item = getItemById(itemId, userId);

    items = items.filter((savedItem) => (
      !(savedItem.id === itemId && savedItem.userId === userId)
    ));

    await save();
    return item;
  }

  function getStats(userId) {
    const visitorItems = items.filter((item) => item.userId === userId);
    return calculateCollectionStats(visitorItems);
  }

  function validateItemData(data) {
    const title = validateTitle(data.title);
    const status = validateStatus(data.status ?? apiConfig.defaultStatus);
    const priority = validatePriority(
      data.priority ?? apiConfig.defaultPriority,
    );
    const tags = validateTags(data.tags ?? []);

    return {
      title,
      description: asString(data.description ?? ""),
      status,
      priority,
      tags,
      notes: asString(data.notes ?? ""),
    };
  }

  function normalizeProvidedExternalItem(externalItem) {
    if (externalItem.externalId && externalItem.title) {
      return {
        externalId: String(externalItem.externalId),
        title: validateTitle(externalItem.title),
        description: asString(externalItem.description ?? ""),
        rawData: externalItem.rawData ?? externalItem,
      };
    }

    return apiClient.normalizeExternalItem(externalItem);
  }

  function cleanAllowedUpdates(updates) {
    const cleaned = {};

    if ("title" in updates) {
      cleaned.title = validateTitle(updates.title);
    }

    if ("description" in updates) {
      cleaned.description = asString(updates.description);
    }

    if ("status" in updates) {
      cleaned.status = validateStatus(updates.status);
    }

    if ("priority" in updates) {
      cleaned.priority = validatePriority(updates.priority);
    }

    if ("tags" in updates) {
      cleaned.tags = validateTags(updates.tags);
    }

    if ("notes" in updates) {
      cleaned.notes = asString(updates.notes);
    }

    return cleaned;
  }

  function validateTitle(title) {
    if (typeof title !== "string" || !title.trim()) {
      throw createError(400, "title is required");
    }

    return title.trim();
  }

  function validateStatus(status) {
    if (!apiConfig.allowedStatuses.includes(status)) {
      throw createError(
        400,
        `status must be one of: ${apiConfig.allowedStatuses.join(", ")}`,
      );
    }

    return status;
  }

  function validatePriority(priority) {
    const numberPriority = Number(priority);

    if (!Number.isInteger(numberPriority) || numberPriority < 1 || numberPriority > 5) {
      throw createError(400, "priority must be a number between 1 and 5");
    }

    return numberPriority;
  }

  function validateTags(tags) {
    if (!Array.isArray(tags)) {
      throw createError(400, "tags must be an array");
    }

    return tags
      .map((tag) => asString(tag).trim())
      .filter(Boolean);
  }

  function asString(value) {
    return typeof value === "string" ? value : String(value ?? "");
  }

  function createError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  return {
    load,
    save,
    createItem,
    importItemFromExternalApi,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getStats,
  };
}
