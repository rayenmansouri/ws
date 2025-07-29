import { Schema, Types } from "mongoose";
import { Class } from "../../../feature/classes/domain/class.entity";
import { createMongoSchema } from "../createSchema";

export const mongoClassSchema = createMongoSchema<Class>({
  name: String,
  classType: {
    type: Types.ObjectId,
    ref: "classType",
  },
  schoolYear: {
    type: Types.ObjectId,
    ref: "schoolYear",
  },
  students: [{ type: Types.ObjectId, ref: "student" }],
  subjectTeacherMap: Schema.Types.Mixed,
  subSubjectTeacherMap: Schema.Types.Mixed,
  notAvailableTimes: [{ day: Number, hours: [{ type: Number }] }],
  maxGapsPerDay: { type: Number },
  maxHoursPerDay: { type: Number },
  maxContinuousHours: { type: Number },
  preferredClassroom: { type: Types.ObjectId, ref: "classroom" },
  classGroups: [{ type: Types.ObjectId, ref: "classGroup" }],
});
