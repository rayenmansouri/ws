export const hasDuplicateElement = (ids: string[]): boolean => {
  const uniqueIds = new Set(ids);
  return uniqueIds.size !== ids.length;
};
