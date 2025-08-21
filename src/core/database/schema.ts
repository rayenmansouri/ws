import { Schema  } from "mongoose";


type CreateSchemaParam<T> = {
    name:string,
    schemaDefinition: Schema<T>,
}

export const schemaRegistry:Record<string,Schema> = {};
// Helper function that enforces complete schema definition
export function createCompleteSchema<T>(param:CreateSchemaParam<T>): Schema<T> {
    const {name,schemaDefinition } = param;
    schemaRegistry[name] = schemaDefinition;
    return schemaDefinition;
}

export function getSchema(name:string): Schema | undefined {
    return schemaRegistry[name];
}

export type Document<T> = T & { _id: string }



  