export type ID = string & { _isID: true };

export type BaseEntity = {
  _id: ID;
  newId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type EntityMetaData = { entity: BaseEntity; populatedFields: Record<string, unknown> };
