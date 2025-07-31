import { Schema } from "mongoose";

export const allSchemas:Record<string,Schema> = {};
// Helper function that enforces complete schema definition
export function createCompleteSchema<T>(name:string,schemaDefinition: Record<keyof T, unknown>): Schema<T> {
    const schema = new Schema<T>(schemaDefinition);
    allSchemas[name] = schema;
    return schema;
}

export function getSchema(name:string): Schema | undefined {
    return allSchemas[name];
}

export type Document<T> = T & { _id: string }



  