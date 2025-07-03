import { BaseEntity, ID, EntityMetaData } from "../types/BaseEntity";
import { RemoveNull } from "../types/utils";

export type GenerateMetaData<
  Entity extends BaseEntity,
  PopulatedFields extends ExtractPopulateField<Entity> & {
    [Field in keyof PopulatedFields]: Field extends keyof ExtractPopulateField<Entity>
      ? ExtractPopulateField<Entity>[Field]
      : never;
  },
> = {
  entity: Entity;
  populatedFields: PopulatedFields;
};

// Excluded fields that shouldn't be considered for population (e.g., `_id`).
type ExcludedPopulatedField = "_id";

// Utility to extract fields from an object type `T` that can be populated (i.e., extend `ID | ID[]`).
// The result is a type with the full path to the populatable fields.
type ExtractPopulateField<T extends Record<string, unknown>> = {
  // Loop over each key in the object `T`.
  [Field in keyof T as RemoveNull<T[Field]> extends ID | ID[]
    ? // Skip fields that are explicitly excluded (like `_id`).
      Field extends ExcludedPopulatedField
      ? never // Don't include excluded fields.
      : Field // Include the field if it's an ID or ID[] and not excluded.
    : // If the field is a nested object, recursively check its fields.
    T[Field] extends Record<string, unknown>
    ? // Construct the full path for nested objects by combining the parent field and the recursive keys.
      `${Extract<Field, string>}.${keyof ExtractPopulateField<T[Field]>}`
    : // If the field is an array of objects, apply recursive extraction on the item type.
    T[Field] extends Array<infer ItemType>
    ? ItemType extends Record<string, unknown>
      ? // Construct the full path for each item in the array if it's an object.
        `${Extract<Field, string>}.${keyof ExtractPopulateField<ItemType>}`
      : never // Skip arrays that don't contain objects.
    : never]: BaseEntity | BaseEntity[]; // If the field is an ID (or an array of IDs), it's a candidate for population. // Skip other types that don't match. // The resulting type for populatable fields is always a BaseEntity or BaseEntity[].
};

export type Populate<
  MetaData extends EntityMetaData,
  FieldsToPopulate extends keyof MetaData["populatedFields"] = never,
> = ApplyMultipleOverwrites<
  MetaData["entity"],
  {
    [Field in FieldsToPopulate]: MetaData["populatedFields"][Field];
  }
>;

// The utility takes two types: `Entity` (the original object) and `U` (the overwrites to be applied).
type ApplyMultipleOverwrites<Entity, U> = {
  // Loop over each key in the Entity.
  [K in keyof Entity]: K extends keyof U // If the current key exists in the overwrite object `U`, use the type from `U` (i.e., apply the overwrite).
    ? null extends Entity[K]
      ? U[K] | null
      : U[K]
    : // If the value in Entity is a nested object, recursively apply overwrites on that nested object.
    Entity[K] extends Record<string, unknown>
    ? ApplyMultipleOverwrites<
        Entity[K],
        // Create a mapped type where we check if a key in `U` matches the format `${K}.${Rest}`.
        // If so, strip the `K.` part and map the remaining keys (`Rest`) to the nested object.
        {
          [P in keyof U as P extends `${K & string}.${infer Rest}` ? Rest : never]: U[P];
        }
      >
    : // If the value is an array, check if the array contains objects and apply overwrites to each item in the array.
    Entity[K] extends Array<infer ItemType>
    ? ItemType extends Record<string, unknown>
      ? ApplyMultipleOverwrites<
          ItemType,
          {
            [P in keyof U as P extends `${K & string}.${infer Rest}` ? Rest : never]: U[P];
          }
        >[]
      : Entity[K] // If the array items aren't objects, return the array as is (no overwrites).
    : Entity[K]; // If the value is neither an object nor an array, return the original value (no overwrite).
};
