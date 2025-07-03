import { CambridgeAnnualGradeReportDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeAnnualGradeReport.dto";
import { GetStudentCambridgeAnnualGradeReportValidation } from "./getStudentCambridgeAnnualGradeReport.validation";

export type GetStudentCambridgeAnnualGradeReportRouteConfig =
  GetStudentCambridgeAnnualGradeReportValidation & { files: never };
export type GetStudentCambridgeAnnualGradeReportResponse = CambridgeAnnualGradeReportDTO;
