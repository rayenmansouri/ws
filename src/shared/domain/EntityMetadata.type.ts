export type EntityMetaData<T> = {
  entity: T;
  populatedFields: Record<string, unknown>;
};
