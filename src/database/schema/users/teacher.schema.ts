import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { preFindOneAndUpdateHook, preSaveHook } from "../../../helpers/databaseHooks";
import { IUser, newfileSchema } from "../../../types/entities";

export interface ITeacher extends IUser {
  releaseDate?: Date;
  subjectTypes: ObjectId[];
  groupTypes: ObjectId[];
  levels: ObjectId[];
  country: string;
  notAvailableTimes: {
    day: number;
    hours: number[];
  }[];
  maxDaysPerWeek: number | null;
  maxGapsPerDay: number | null;
  maxHoursPerDay: number | null;
  preferredClassroom: ObjectId | null;
  roles: ObjectId[];
}
const notAvailableTimeSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    hours: {
      type: [Number],
      default: [],
    },
  },
  { _id: false },
);

export const teacherSchema = createSchema<ITeacher>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  releaseDate: {
    type: Date,
  },

  bloodType: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,

    select: false,
  },
  country: {
    type: String,
  },
  subjectTypes: [{ type: mongoose.Types.ObjectId, ref: "subjectType", default: [] }],
  groupTypes: [{ type: mongoose.Types.ObjectId, ref: "groupType", default: [] }],
  levels: [{ type: mongoose.Types.ObjectId, ref: "level" }],
  notAvailableTimes: [notAvailableTimeSchema],
  maxDaysPerWeek: { type: Number, default: null },
  maxGapsPerDay: { type: Number, default: null },
  maxHoursPerDay: { type: Number, default: null },
  preferredClassroom: { type: mongoose.Types.ObjectId, ref: "classroom", default: null },
  passwordChangedAt: {
    type: Date,
    default: undefined,
  },
  roles: [{ type: mongoose.Types.ObjectId, default: [] }],
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

preSaveHook(teacherSchema);

preFindOneAndUpdateHook(teacherSchema);
