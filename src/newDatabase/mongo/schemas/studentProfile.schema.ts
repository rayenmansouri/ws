import { Types } from "mongoose";
import { StudentProfile } from "../../../feature/students/domain/studentProfile.entity";
import { createMongoSchema } from "../createSchema";

export const mongoStudentProfileSchema = createMongoSchema<StudentProfile>({
  class: { type: Types.ObjectId, ref: "class" },
  classGroup: { type: Types.ObjectId, ref: "classGroup" },
  groups: [{ type: Types.ObjectId, ref: "group" }],
  schoolYear: { type: Types.ObjectId, ref: "schoolYear" },
  student: { type: Types.ObjectId, ref: "student" },
  isExceptionallyPromoted: Boolean,
});
