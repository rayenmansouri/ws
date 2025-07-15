import { Connection, FilterQuery } from "mongoose";
import { entityInterfaces } from "../database/entityInterfaces";
import { crudRepo } from "../database/repositories/crud.repo";
import { BadRequestError } from "../core/ApplicationErrors";
import { IEntity } from "../types/entities";

export const ensureNameIsNotUsed = async <I extends keyof entityInterfaces>(
  connection: Connection,
  entity: I,
  name: string | undefined,
  newId?: string,
): Promise<void> => {
  if (!name) return;

  const filterQuery: FilterQuery<IEntity> = {
    name,
  };

  if (newId) filterQuery.newId = { $ne: newId };

  const entityWithSameName = await crudRepo(connection, entity).findOne(filterQuery);

  if (entityWithSameName) throw new BadRequestError("alreadyUsed.name");
};
