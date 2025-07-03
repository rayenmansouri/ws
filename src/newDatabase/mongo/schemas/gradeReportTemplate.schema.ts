import { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { GradeReportTemplate } from "../../../feature/gradeReportTemplate/domain/gradeReportTemplate.entity";

export const mongoGradeReportTemplateSchema = createMongoSchema<GradeReportTemplate>({
  name: { type: String },
  subjectTypes: [{ type: Types.ObjectId, ref: "subjectType" }],
  classTypes: [{ type: Types.ObjectId, ref: "classType" }],
  isDefault: { type: Boolean },
  isBuiltIn: { type: Boolean },
});
