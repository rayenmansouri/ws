import { Schema, SchemaDefinitionProperty, SchemaOptions } from "mongoose";
import { IEntity } from "../types/entities";
import { addNewIDMiddleware } from "./databaseHooks";

type SchemaDefinition<T extends IEntity> = {
  [path in keyof Omit<T, keyof IEntity>]: SchemaDefinitionProperty<T[path]>;
};

export const createSchema = <I extends IEntity>(
  schema: SchemaDefinition<I>,
  options?: SchemaOptions,
) => {
  const createdSchema = new Schema<I>(
    {
      ...schema,
      newId: {
        type: String,
        index: true,
      },
    },
    //@ts-ignore
    { versionKey: false, timestamps: true, excludeIndexes: true, ...options },
  );
  addNewIDMiddleware(createdSchema);

  return createdSchema;
};
