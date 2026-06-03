export function createSavedItem({
  id,
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
