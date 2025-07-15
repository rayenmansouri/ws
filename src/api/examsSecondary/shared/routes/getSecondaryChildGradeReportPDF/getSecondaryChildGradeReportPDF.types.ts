import { SecondaryGradeReportDTO } from "../../../../../feature/examGrade/dto/secondary/SecondaryGradeReport.dto";
import { GetSecondaryChildGradeReportPDFValidation } from "./getSecondaryChildGradeReportPDF.validation";

export type GetSecondaryChildGradeReportPDFRouteConfig =
  GetSecondaryChildGradeReportPDFValidation & { files: never };
export type GetSecondaryChildGradeReportPDFResponse = SecondaryGradeReportDTO;
