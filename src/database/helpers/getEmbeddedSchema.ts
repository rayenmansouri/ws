import { Schema, Types } from "mongoose";

export const getEmbeddedSchema = (schema: Schema) => {
  return {
    ...schema.obj,
    _id: Types.ObjectId,
    newId: String,
  };
};
