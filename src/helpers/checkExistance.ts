import { Connection, ObjectId } from "mongoose";
import { NotFoundError } from "../core/ApplicationErrors";
import { entityInterfaces } from "../database/entityInterfaces";
import { crudRepo } from "../database/repositories/crud.repo";

export const checkExistence = async <I extends keyof entityInterfaces>(
  connection: Connection,
  entities: I[],
  ids: (string | ObjectId)[],
) => {
  const docs: any = {};
  for (let i = 0; i < entities.length; i++) {
    const result = await crudRepo(connection, entities[i]).findOne({
      _id: ids[i],
    });
    if (!result) throw new NotFoundError(`${entities[i]} not found!`);
    docs[`${entities[i]}`] = result;
  }
  return docs;
};
