import { ExamType } from "../../../feature/examTypes/domains/examType.entity";
import { createMongoSchema } from "../createSchema";

export const mongoExamTypeSchema = createMongoSchema<ExamType>({
  name: String,
  rank: Number,
});
