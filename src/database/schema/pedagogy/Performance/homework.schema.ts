import mongoose, { ObjectId } from "mongoose";
import { IFile } from "../../../../feature/sessionManagement/domain/session.entity";
import { THomeworkStatusEnum } from "../../../../features/homework/constants/shared/addHomework.constants";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { fileSchema } from "../../announcement/comment.schema";

export interface IHomework extends IEntity {
  name: string;
  subjectType: ObjectId;
  subSubjectType: ObjectId;
  group: ObjectId;
  teacher: ObjectId;
  addedByAdmin: ObjectId;
  class: ObjectId;
  classGroup: ObjectId | undefined;
  files: IFile[];
  description: string | null;
  status: THomeworkStatusEnum;
  dueDate: Date;
}

export const homeworkSchema = createSchema<IHomework>({
  name: String,
  dueDate: { type: Date },
  subjectType: { type: mongoose.Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: mongoose.Types.ObjectId, ref: "subSubjectType" },
  group: { type: mongoose.Types.ObjectId, ref: "group" },
  teacher: { type: mongoose.Types.ObjectId, ref: "teacher" },
  addedByAdmin: { type: mongoose.Types.ObjectId, ref: "admin" },
  class: { type: mongoose.Types.ObjectId, ref: "class" },
  classGroup: { type: mongoose.Types.ObjectId, ref: "classGroup" },
  files: { type: [fileSchema], default: [] },
  description: { type: String, default: null },
  status: String,
});
