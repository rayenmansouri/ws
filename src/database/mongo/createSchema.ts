import mongoose, { AnyArray, Schema, SchemaTypes, Types } from "mongoose";
import { autoLeanAndConvertObjectId } from "../../helpers/databaseHooks";
import { BaseEntity, ID } from "../../types/BaseEntity";
import { RemoveNull } from "../../types/utils";

type SchemaTypeOptions<T> = T extends ID
  ? typeof Types.ObjectId
  : T extends string
  ? typeof String
  : T extends number
  ? typeof Number
  : T extends boolean
  ? typeof Boolean
  : T extends Date
  ? typeof Date
  : T extends ID[]
  ? AnyArray<{ type: typeof Types.ObjectId; ref: string }>
  : T extends unknown
  ? typeof SchemaTypes.Mixed
  : T extends string[]
  ? AnyArray<typeof String>
  : T extends number[]
  ? AnyArray<typeof Number>
  : T extends boolean[]
  ? AnyArray<typeof Boolean>
  : T extends object
  ? typeof mongoose.Schema.Types.Mixed
  : never;

type SchemaDefinition<Type extends Record<string, unknown>> = {
  [Field in keyof Type]: RemoveNull<Type[Field]> extends Array<infer ItemType>
    ? ItemType extends BaseEntity
      ? [Schema<ItemType>]
      : RemoveNull<ItemType> extends Record<string, unknown>
      ? [SchemaDefinition<RemoveNull<ItemType>>]
      : [
          {
            type: SchemaTypeOptions<ItemType>;
            index?: boolean;
            ref?: string;
            refPath?: string;
          },
        ]
    : Type[Field] extends BaseEntity
    ? Schema<Type[Field]>
    : RemoveNull<Type[Field]> extends Record<string, unknown>
    ?
        | SchemaDefinition<RemoveNull<Type[Field]>>
        | typeof SchemaTypes.Mixed
        | { type: SchemaDefinition<RemoveNull<Type[Field]>> }
    :
        | {
            type: SchemaTypeOptions<Type[Field]>;
            ref?: string;
            index?: boolean;
            refPath?: string;
          }
        | SchemaTypeOptions<Type[Field]>;
};

export const createMongoSchema = <Entity extends BaseEntity>(
  schema: SchemaDefinition<Omit<Entity, keyof BaseEntity>>,
): Schema<Entity> => {
  const createdSchema = new Schema<Entity>(
    {
      ...schema,
      newId: {
        type: String,
        index: true,
      },
    },
    {
      excludeIndexes: true,
      versionKey: false,
      timestamps: true,
      toObject: {
        virtuals: false,
      },
      minimize: false,
    },
  );

  autoLeanAndConvertObjectId(createdSchema);

  return createdSchema;
};
