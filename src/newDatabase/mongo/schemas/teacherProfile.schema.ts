import { Types } from "mongoose";
import { TeacherProfile } from "../../../feature/teachers/domain/teacherProfile.entity";
import { createMongoSchema } from "../createSchema";

export const mongoTeacherProfileSchema = createMongoSchema<TeacherProfile>({
  teacher: { type: Types.ObjectId, ref: "teacher" },
  schoolYear: { type: Types.ObjectId, ref: "schoolYear" },
  classes: [{ type: Types.ObjectId, ref: "class" }],
  groups: [{ type: Types.ObjectId, ref: "group" }],
});
