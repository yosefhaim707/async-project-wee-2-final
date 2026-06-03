import { createSavedItem } from "./savedItemFactory.js";
import { calculateCollectionStats } from "./stats.js";

export class CollectionManager {
  constructor({ generateItemId, storage, apiClient, apiConfig }) {
    this.items = [];
    this.generateItemId = generateItemId;
    this.storage = storage;
    this.apiClient = apiClient;
    this.apiConfig = apiConfig;
  }

  async load() {
    this.items = await this.storage.read();
  }

  async save() {
    await this.storage.write(this.items);
  }

  async createItem(data) {
    const cleanData = this.validateItemData(data);
    const item = createSavedItem({
      id: this.generateItemId(),
      userId: data.userId,
      sourceApi: "Manual",
      itemType: "manual",
      ...cleanData,
    });

    this.items = [...this.items, item];
    await this.save();
    return item;
  }

  async importItemFromExternalApi(data) {
    if (!data.externalId && !data.externalItem) {
      throw this.createError(400, "externalId or externalItem is required");
    }

    const externalItem = data.externalItem
      ? this.normalizeProvidedExternalItem(data.externalItem)
      : await this.apiClient.getExternalItemById(data.externalId);

    const alreadySaved = this.items.some((item) => (
      item.userId === data.userId
      && item.sourceApi === this.apiConfig.apiName
      && item.externalId === externalItem.externalId
    ));

    if (alreadySaved) {
      throw this.createError(409, "This external item is already saved");
    }

    const cleanData = this.validateItemData({
      ...data,
      title: externalItem.title,
      description: externalItem.description,
    });

    const item = createSavedItem({
      id: this.generateItemId(),
      userId: data.userId,
      sourceApi: this.apiConfig.apiName,
      itemType: this.apiConfig.itemType,
      externalId: externalItem.externalId,
      title: externalItem.title,
      description: externalItem.description,
      status: cleanData.status,
      priority: cleanData.priority,
      tags: cleanData.tags,
      notes: cleanData.notes,
      rawData: externalItem.rawData ?? externalItem,
    });

    this.items = [...this.items, item];
    await this.save();
    return item;
  }

  getAllItems(filters = {}) {
    return this.items
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

  getItemById(itemId, userId) {
    const item = this.items.find((savedItem) => (
      savedItem.id === itemId && savedItem.userId === userId
    ));

    if (!item) {
      throw this.createError(404, "Item not found");
    }

    return item;
  }

  async updateItem(itemId, updates, userId) {
    const item = this.getItemById(itemId, userId);
    const blockedFields = ["id", "userId", "createdAt"];
    const blockedField = blockedFields.find((field) => field in updates);

    if (blockedField) {
      throw this.createError(400, `${blockedField} cannot be updated`);
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

    this.validateItemData({
      ...item,
      ...cleanUpdates,
      userId,
    });

    const updatedItem = {
      ...item,
      ...this.cleanAllowedUpdates(cleanUpdates),
      updatedAt: new Date().toISOString(),
    };

    this.items = this.items.map((savedItem) => (
      savedItem.id === itemId && savedItem.userId === userId
        ? updatedItem
        : savedItem
    ));

    await this.save();
    return updatedItem;
  }

  async deleteItem(itemId, userId) {
    const item = this.getItemById(itemId, userId);

    this.items = this.items.filter((savedItem) => (
      !(savedItem.id === itemId && savedItem.userId === userId)
    ));

    await this.save();
    return item;
  }

  getStats(userId) {
    const visitorItems = this.items.filter((item) => item.userId === userId);
    return calculateCollectionStats(visitorItems);
  }

  validateItemData(data) {
    const title = this.validateTitle(data.title);
    const status = this.validateStatus(data.status ?? this.apiConfig.defaultStatus);
    const priority = this.validatePriority(
      data.priority ?? this.apiConfig.defaultPriority,
    );
    const tags = this.validateTags(data.tags ?? []);

    return {
      title,
      description: this.asString(data.description ?? ""),
      status,
      priority,
      tags,
      notes: this.asString(data.notes ?? ""),
    };
  }

  normalizeProvidedExternalItem(externalItem) {
    if (externalItem.externalId && externalItem.title) {
      return {
        externalId: String(externalItem.externalId),
        title: this.validateTitle(externalItem.title),
        description: this.asString(externalItem.description ?? ""),
        rawData: externalItem.rawData ?? externalItem,
      };
    }

    return this.apiClient.normalizeExternalItem(externalItem);
  }

  cleanAllowedUpdates(updates) {
    const cleaned = {};

    if ("title" in updates) {
      cleaned.title = this.validateTitle(updates.title);
    }

    if ("description" in updates) {
      cleaned.description = this.asString(updates.description);
    }

    if ("status" in updates) {
      cleaned.status = this.validateStatus(updates.status);
    }

    if ("priority" in updates) {
      cleaned.priority = this.validatePriority(updates.priority);
    }

    if ("tags" in updates) {
      cleaned.tags = this.validateTags(updates.tags);
    }

    if ("notes" in updates) {
      cleaned.notes = this.asString(updates.notes);
    }

    return cleaned;
  }

  validateTitle(title) {
    if (typeof title !== "string" || !title.trim()) {
      throw this.createError(400, "title is required");
    }

    return title.trim();
  }

  validateStatus(status) {
    if (!this.apiConfig.allowedStatuses.includes(status)) {
      throw this.createError(
        400,
        `status must be one of: ${this.apiConfig.allowedStatuses.join(", ")}`,
      );
    }

    return status;
  }

  validatePriority(priority) {
    const numberPriority = Number(priority);

    if (!Number.isInteger(numberPriority) || numberPriority < 1 || numberPriority > 5) {
      throw this.createError(400, "priority must be a number between 1 and 5");
    }

    return numberPriority;
  }

  validateTags(tags) {
    if (!Array.isArray(tags)) {
      throw this.createError(400, "tags must be an array");
    }

    return tags
      .map((tag) => this.asString(tag).trim())
      .filter(Boolean);
  }

  asString(value) {
    return typeof value === "string" ? value : String(value ?? "");
  }

  createError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }
}
