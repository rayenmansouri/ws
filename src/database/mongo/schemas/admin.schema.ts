import { Types } from "mongoose";
import { Admin } from "../../../feature/admins/domain/admin.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

export const mongoAdminSchema = createMongoSchema<Admin>({
  firstName: String,
  lastName: String,
  fullName: String,
  gender: String,
  avatar: newfileSchema,
  address1: String,
  address2: String,
  phoneNumber: String,
  birthDate: Date,
  email: String,
  password: String,
  passwordChangedAt: Date,
  isImpersonation: Boolean,
  roles: [{ type: Types.ObjectId }],
  isArchived: Boolean,
  archivedAt: Date,
  isActive: Boolean,
});
