import { ChildCambridgeGradeReportDto } from "../../../../../feature/examGrade/dto/cambridge/ChildCambridgeGradeReport.dto";
import { GetCambridgeChildGradeReportValidation } from "./getCambridgeChildGradeReport.validation";

export type GetCambridgeChildGradeReportRouteConfig = GetCambridgeChildGradeReportValidation & {
  files: never;
};
export type GetCambridgeChildGradeReportResponse = ChildCambridgeGradeReportDto;
