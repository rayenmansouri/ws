import { CambridgeGradeReportDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeGradeReport.dto";
import { GetCambridgeChildGradeReportPDFValidation } from "./getCambridgeChildGradeReportPDF.validation";

export type GetCambridgeChildGradeReportPDFRouteConfig =
  GetCambridgeChildGradeReportPDFValidation & { files: never };
export type GetCambridgeChildGradeReportPDFResponse = CambridgeGradeReportDTO;
