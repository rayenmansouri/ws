import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface IStudentProfile extends IEntity {
  student: ObjectId;
  schoolYear: ObjectId;
  class: ObjectId | null;
  groups: ObjectId[];
  classGroup: ObjectId | null;
}

export const studentProfileSchema = createSchema<IStudentProfile>({
  student: { type: mongoose.Types.ObjectId, ref: "student" },
  schoolYear: { type: mongoose.Types.ObjectId, ref: "schoolYear" },
  class: { type: mongoose.Types.ObjectId, ref: "class", default: null },
  groups: { type: [mongoose.Types.ObjectId], ref: "group", default: [] },
  classGroup: { type: mongoose.Types.ObjectId, ref: "classGroup", default: null },
});
