import { BaseEntity } from "../domain/baseEntity";

export type EntityMetaData<T extends BaseEntity> = {
  entity: T;
  populatedFields: Record<string, unknown>;
};
