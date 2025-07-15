import { IBGradeReportDTO } from "../../../../../feature/examGrade/dto/ib/IBGradeReport.dto";
import { GetIBStudentGradeReportValidation } from "./getIBStudentGradeReport.validation";

export type GetIBStudentGradeReportRouteConfig = GetIBStudentGradeReportValidation & {
  files: never;
};
export type GetIBStudentGradeReportResponse = IBGradeReportDTO;
