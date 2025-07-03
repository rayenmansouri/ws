import { IBGradeReportDTO } from "../../../../../feature/examGrade/dto/ib/IBGradeReport.dto";
import { GetAllIBGradeReportsOfClassValidation } from "./getAllIBGradeReportsOfClass.validation";

export type GetAllIBGradeReportsOfClassRouteConfig = GetAllIBGradeReportsOfClassValidation & {
  files: never;
};
export type GetAllIBGradeReportsOfClassResponse = IBGradeReportDTO[];
