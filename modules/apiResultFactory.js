export function createApiResult({
  externalId,
  title,
  description = "",
  imageUrl = "",
  sourceUrl = "",
  rawData = {},
}) {
  return {
    externalId,
    title,
    description,
    imageUrl,
    sourceUrl,
    rawData,
  };
}
