import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface ITeacherProfile extends IEntity {
  teacher: ObjectId;
  schoolYear: ObjectId;
  classes: ObjectId[];
  groups: ObjectId[];
}

export const teacherProfileSchema = createSchema<ITeacherProfile>({
  teacher: { type: mongoose.Types.ObjectId, ref: "teacher" },
  schoolYear: { type: mongoose.Types.ObjectId, ref: "schoolYear" },
  classes: [{ type: mongoose.Types.ObjectId, ref: "class", default: [] }],
  groups: [{ type: mongoose.Types.ObjectId, ref: "group" }],
});
