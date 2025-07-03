import { IBGradeReportDTO } from "../../../../../feature/examGrade/dto/ib/IBGradeReport.dto";
import { GetIBChildGradeReportPDFValidation } from "./getIBChildGradeReportPDF.validation";

export type GetIBChildGradeReportPDFRouteConfig = GetIBChildGradeReportPDFValidation & {
  files: never;
};
export type GetIBChildGradeReportPDFResponse = IBGradeReportDTO;
