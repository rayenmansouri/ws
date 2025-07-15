import { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { preFindOneAndUpdateHook, preSaveHook } from "../../../helpers/databaseHooks";
import { IUser, newfileSchema } from "../../../types/entities";

export interface IAdmin extends IUser {
  roles: ObjectId[];
  releaseDate?: Date;
  isImpersonation: boolean;
}

export const adminSchema = createSchema<IAdmin>({
  firstName: { type: String },
  lastName: { type: String },
  avatar: newfileSchema,
  fullName: { type: String },
  gender: { type: String },
  address1: { type: String },
  address2: { type: String },
  phoneNumber: { type: String },
  birthDate: { type: Date },
  releaseDate: { type: Date, required: false },
  bloodType: { type: String },
  email: { type: String },
  roles: [{ type: Types.ObjectId }],
  password: { type: String, required: false, select: false },
  passwordChangedAt: { type: Date, default: undefined },
  isImpersonation: { type: Boolean },
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

preSaveHook(adminSchema);

preFindOneAndUpdateHook(adminSchema);
