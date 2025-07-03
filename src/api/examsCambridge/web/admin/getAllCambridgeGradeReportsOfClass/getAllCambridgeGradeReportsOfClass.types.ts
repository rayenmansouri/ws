import { GetAllCambridgeGradeReportsOfClassValidation } from "./getAllCambridgeGradeReportsOfClass.validation";
import { CambridgeGradeReportDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeGradeReport.dto";

export type GetAllCambridgeGradeReportsOfClassRouteConfig =
  GetAllCambridgeGradeReportsOfClassValidation & { files: never };
export type GetAllCambridgeGradeReportsOfClassResponse = CambridgeGradeReportDTO[];
