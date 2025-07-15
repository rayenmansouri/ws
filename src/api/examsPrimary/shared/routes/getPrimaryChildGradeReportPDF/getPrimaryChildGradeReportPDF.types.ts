import { PrimaryGradeReportDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryGradeReport.dto";
import { GetPrimaryChildGradeReportPDFValidation } from "./getPrimaryChildGradeReportPDF.validation";

export type GetPrimaryChildGradeReportPDFRouteConfig = GetPrimaryChildGradeReportPDFValidation & {
  files: never;
};
export type GetPrimaryChildGradeReportPDFResponse = PrimaryGradeReportDTO[];
