import mongoose, { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { ExamGrade } from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";

export const mongoExamGradeSchema = createMongoSchema<ExamGrade>({
  topicId: { type: Types.ObjectId, refPath: "topicType" },
  topicType: String,
  term: { type: Types.ObjectId, ref: "term" },
  examType: { type: Types.ObjectId, ref: "examType" },
  degrees: mongoose.Schema.Types.Mixed,
  class: { type: Types.ObjectId, ref: "class" },
});
