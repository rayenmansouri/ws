import { Schema } from "mongoose";

export const schemaRegistry:Record<string,Schema> = {};
// Helper function that enforces complete schema definition
export function createCompleteSchema<T>(name:string,schemaDefinition: Record<keyof T, unknown>): Schema<T> {
    const schema = new Schema<T>(schemaDefinition);
    schemaRegistry[name] = schema;
    return schema;
}

export function getSchema(name:string): Schema | undefined {
    return schemaRegistry[name];
}

export type Document<T> = T & { _id: string }



  