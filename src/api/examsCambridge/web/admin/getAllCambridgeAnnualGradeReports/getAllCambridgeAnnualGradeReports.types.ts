import { CambridgeAnnualGradeReportDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeAnnualGradeReport.dto";
import { GetAllCambridgeAnnualGradeReportsValidation } from "./getAllCambridgeAnnualGradeReports.validation";

export type GetAllCambridgeAnnualGradeReportsRouteConfig =
  GetAllCambridgeAnnualGradeReportsValidation & { files: never };
export type GetAllCambridgeAnnualGradeReportsResponse = CambridgeAnnualGradeReportDTO[];
