import { ID } from "./../types/BaseEntity";
import mongoose from "mongoose";

export const stringToObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id) as unknown as mongoose.Schema.Types.ObjectId;
};

export const stringsToObjectIds = (ids: (string | ID)[]): mongoose.Schema.Types.ObjectId[] => {
  return ids.map(
    id => new mongoose.Types.ObjectId(id) as unknown as mongoose.Schema.Types.ObjectId,
  );
};
