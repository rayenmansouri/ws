import { CambridgeGradeReportDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeGradeReport.dto";
import { GetStudentGradeReportCambridgeValidation } from "./getStudentGradeReportCambridge.validation";

export type GetStudentGradeReportCambridgeRouteConfig = GetStudentGradeReportCambridgeValidation & {
  files: never;
};
export type GetStudentGradeReportCambridgeResponse = CambridgeGradeReportDTO;
