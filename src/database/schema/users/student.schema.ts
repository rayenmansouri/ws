import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { preFindOneAndUpdateHook, preSaveHook } from "../../../helpers/databaseHooks";
import { IUser, newfileSchema } from "../../../types/entities";

export interface IStudent extends IUser {
  level: ObjectId;
  classType: ObjectId;
  nextClassType: ObjectId | null;
  parents: ObjectId[];
  uniqueId: string | null;
}

export const studentSchema = createSchema<IStudent>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: newfileSchema,
  fullName: {
    type: String,
  },
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
  bloodType: {
    type: String,
  },
  level: { type: mongoose.Types.ObjectId, ref: "level" },
  classType: { type: mongoose.Types.ObjectId, ref: "classType" },
  nextClassType: { type: mongoose.Types.ObjectId, ref: "classType", default: null },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  parents: [{ type: mongoose.Types.ObjectId, ref: "parent", default: [] }],
  passwordChangedAt: {
    type: Date,
    default: undefined,
  },
  uniqueId: { type: String, default: null },
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

preSaveHook(studentSchema);

preFindOneAndUpdateHook(studentSchema);
