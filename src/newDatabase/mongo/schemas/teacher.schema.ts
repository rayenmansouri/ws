import { Types } from "mongoose";
import { Teacher } from "../../../feature/teachers/domain/teacher.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "../../../types/entities";

export const mongoTeacherSchema = createMongoSchema<Teacher>({
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  gender: String,
  phoneNumber: String,
  password: String,
  passwordChangedAt: Date,
  birthDate: Date,
  address1: String,
  address2: String,
  avatar: newfileSchema,
  levels: [{ type: Types.ObjectId, ref: "level" }],

  maxDaysPerWeek: Number,
  maxHoursPerDay: Number,
  maxGapsPerDay: Number,
  notAvailableTimes: [
    {
      day: Number,
      hours: [{ type: Number }],
    },
  ],
  preferredClassroom: { type: Types.ObjectId, ref: "classroom" },
  subjectTypes: [{ type: Types.ObjectId, ref: "subjectType" }],
  groupTypes: [{ type: Types.ObjectId, ref: "groupType" }],
  roles: [{ type: Types.ObjectId }],
  isArchived: Boolean,
  archivedAt: Date,
  isActive: Boolean,
});
