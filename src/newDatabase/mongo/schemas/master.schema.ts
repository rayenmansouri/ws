import mongoose, { Types } from "mongoose";
import { Master } from "../../../feature/masters/domain/master.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

export const mongoMasterSchema = createMongoSchema<Master>({
  firstName: String,
  lastName: String,
  fullName: String,
  gender: String,
  address1: String,
  address2: String,
  avatar: newfileSchema,
  email: String,
  phoneNumber: String,
  roles: [{ type: Types.ObjectId, ref: "role" }],
  birthDate: Date,
  password: String,
  passwordChangedAt: Date,
  isArchived: Boolean,
  archivedAt: Date,
  isActive: Boolean,
});

export const mongoMasterModel = mongoose.model<Master>("masters", mongoMasterSchema);
