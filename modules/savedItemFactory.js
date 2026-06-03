export function createSavedItem({
  id,
  userId,
  sourceApi,
  itemType,
  externalId = null,
  title,
  description = "",
  status = "saved",
  priority = 3,
  tags = [],
  notes = "",
  rawData = {},
}) {
  const now = new Date().toISOString();

  return {
    id,
    userId,
    sourceApi,
    itemType,
    externalId,
    title: title.trim(),
    description,
    status,
    priority,
    tags,
    notes,
    rawData,
    createdAt: now,
    updatedAt: now,
  };
}
