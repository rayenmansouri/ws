import { ChildPrimaryGradeReportDto } from "../../../../../feature/examGrade/dto/primary/ChildPrimaryGradeReport.dto";
import { GetPrimaryChildGradeReportValidation } from "./getPrimaryChildGradeReport.validation";

export type GetPrimaryChildGradeReportRouteConfig = GetPrimaryChildGradeReportValidation & {
  files: never;
};
export type GetPrimaryChildGradeReportResponse = ChildPrimaryGradeReportDto;
