import { Schema  } from "mongoose";

type SchemaOptions = {
    discriminatorKey:string,
    collection:string,
    timestamps:boolean,
}

type CreateSchemaParam<T> = {
    name:string,
    schemaDefinition: Record<keyof T, unknown>,
    options:SchemaOptions,
}

export const schemaRegistry:Record<string,Schema> = {};
// Helper function that enforces complete schema definition
export function createCompleteSchema<T>(param:CreateSchemaParam<T>): Schema<T> {
    const {name,schemaDefinition,options} = param;
    const schema = new Schema<T>(schemaDefinition,options);
    schemaRegistry[name] = schema;
    return schema;
}

export function getSchema(name:string): Schema | undefined {
    return schemaRegistry[name];
}

export type Document<T> = T & { _id: string }



  