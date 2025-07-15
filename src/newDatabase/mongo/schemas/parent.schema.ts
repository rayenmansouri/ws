import { Types } from "mongoose";
import { Parent } from "../../../feature/parents/domain/parent.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

export const mongoParentSchema = createMongoSchema<Parent>({
  firstName: String,
  lastName: String,
  fullName: String,
  address1: String,
  address2: String,
  avatar: newfileSchema,
  birthDate: Date,
  phoneNumber: String,
  email: String,
  gender: String,
  password: String,
  passwordChangedAt: Date,
  nationalCardId: String,
  students: [{ type: Types.ObjectId, ref: "student" }],
  roles: [{ type: Types.ObjectId }],
  isArchived: Boolean,
  archivedAt: Date,
  isActive: Boolean,
});
