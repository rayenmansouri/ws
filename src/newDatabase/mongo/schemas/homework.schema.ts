import { Types } from "mongoose";
import { Homework } from "../../../feature/homeworks/domain/homework.entity";
import { createMongoSchema } from "../createSchema";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";

export const mongoHomeworkSchema = createMongoSchema<Homework>({
  name: String,
  dueDate: Date,
  subjectType: { type: Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
  group: { type: Types.ObjectId, ref: "group" },
  teacher: { type: Types.ObjectId, ref: "teacher" },
  addedByAdmin: { type: Types.ObjectId, ref: "admin" },
  class: { type: Types.ObjectId, ref: "class" },
  classGroup: { type: Types.ObjectId, ref: "classGroup" },
  files: [fileSchema],
  description: { type: String },
  status: String,
});
