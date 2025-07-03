import { ChildSecondaryGradeReportDto } from "../../../../../feature/examGrade/dto/secondary/ChildSecondaryGradeReport.dto";
import { GetSecondaryChildGradeReportValidation } from "./getSecondaryChildGradeReport.validation";

export type GetSecondaryChildGradeReportRouteConfig = GetSecondaryChildGradeReportValidation & {
  files: never;
};
export type GetSecondaryChildGradeReportResponse = ChildSecondaryGradeReportDto;
