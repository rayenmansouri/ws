import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { preFindOneAndUpdateHook, preSaveHook } from "../../../helpers/databaseHooks";
import { IUser, newfileSchema } from "../../../types/entities";

export interface IParent extends IUser {
  country: string;
  students: ObjectId[];
  job: string;
  nationalCardId: string | null;
}

export const parentSchema = createSchema<IParent>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  job: String,
  avatar: newfileSchema,
  gender: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  country: {
    type: String,
  },
  students: [{ type: mongoose.Types.ObjectId, ref: "student", default: [] }],
  passwordChangedAt: {
    type: Date,
    default: undefined,
  },
  nationalCardId: { type: String, default: null },
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

preSaveHook(parentSchema);

preFindOneAndUpdateHook(parentSchema);
