import { ObjectId } from "mongoose";
import { stringToObjectId } from "../stringToObjectId";
import { faker } from "@faker-js/faker";

export const createIds = (nbr: number) => {
  const ids: ObjectId[] = [];

  for (let i = 0; i < nbr; i++) ids.push(stringToObjectId(faker.database.mongodbObjectId()));

  return ids;
};
