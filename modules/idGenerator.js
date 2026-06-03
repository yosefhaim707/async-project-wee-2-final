export function createIdGenerator(prefix = "ID", startingNumber = 0) {
  let currentId = startingNumber;

  return function generateId() {
    currentId += 1;
    return `${prefix}-${currentId}`;
  };
}

export function getHighestIdNumber(items, fieldName, prefix) {
  return items
    .map((item) => item[fieldName])
    .filter((value) => typeof value === "string" && value.startsWith(`${prefix}-`))
    .map((value) => Number(value.replace(`${prefix}-`, "")))
    .filter((value) => Number.isInteger(value) && value > 0)
    .reduce((highest, value) => Math.max(highest, value), 0);
}
