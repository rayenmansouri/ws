import { PrimaryGradeReportDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryGradeReport.dto";
import { GetStudentGradeReportPrimaryValidation } from "./getStudentGradeReportPrimary.validation";

export type GetStudentGradeReportPrimaryRouteConfig = GetStudentGradeReportPrimaryValidation & {
  files: never;
};
export type GetStudentGradeReportPrimaryResponse = PrimaryGradeReportDTO[];
