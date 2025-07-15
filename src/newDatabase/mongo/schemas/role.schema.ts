import mongoose, { Schema } from "mongoose";
import { Role } from "../../../feature/authorization/domain/role.entity";
import { createMongoSchema } from "../createSchema";

export const mongoRoleSchema = createMongoSchema<Role>({
  name: String,
  permissions: [{ type: String }],
  userTypes: [{ type: String }],
  translation: Schema.Types.Mixed,
});

export const mongoRoleModel = mongoose.model("role", mongoRoleSchema);
