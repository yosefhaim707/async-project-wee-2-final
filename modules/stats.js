export function calculateCollectionStats(items) {
  const totalItems = items.length;
  const itemsByStatus = countBy(items, (item) => item.status);
  const itemsByPriority = countBy(items, (item) => String(item.priority));
  const tagCounts = countTags(items);
  const sortedByCreatedAt = [...items].sort((first, second) => (
    new Date(first.createdAt) - new Date(second.createdAt)
  ));
  const priorityTotal = items.reduce((total, item) => total + item.priority, 0);

  return {
    totalItems,
    itemsByStatus,
    itemsByPriority,
    mostUsedTag: getMostUsedTag(tagCounts),
    newestItem: sortedByCreatedAt.at(-1) ?? null,
    oldestItem: sortedByCreatedAt[0] ?? null,
    averagePriority: totalItems ? Number((priorityTotal / totalItems).toFixed(2)) : 0,
  };
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);

    return {
      ...counts,
      [key]: (counts[key] ?? 0) + 1,
    };
  }, {});
}

function countTags(items) {
  return items
    .flatMap((item) => item.tags)
    .reduce((counts, tag) => ({
      ...counts,
      [tag]: (counts[tag] ?? 0) + 1,
    }), {});
}

function getMostUsedTag(tagCounts) {
  const [tag = null] = Object.entries(tagCounts)
    .sort((first, second) => second[1] - first[1])
    .at(0) ?? [];

  return tag;
}
