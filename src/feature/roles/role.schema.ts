import { model } from "mongoose";
import { createCompleteSchema } from "../../core/database/schema";
import { Role } from "./role.entity";

export const RoleKey = "roles";
export const RoleSchema = createCompleteSchema<Role>({
    name: "roles",
    schemaDefinition: {
        name: { type: String, required: true, unique: true },
        permissions: { type: [String], required: true },
        userTypes: { type: [String], required: true },
        description: { type: String, required: false },
        translation: { type: Object, required: true },
    },
    options: {}
});

export const RoleModel = model<Role>(RoleKey, RoleSchema);