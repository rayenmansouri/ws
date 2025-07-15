import { PrimaryAnnualGradeReportDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryAnnualGradeReport.dto";
import { GetPrimaryAnnualGradeReportOfStudentValidation } from "./getPrimaryAnnualGradeReportOfStudent.validation";

export type GetPrimaryAnnualGradeReportOfStudentRouteConfig =
  GetPrimaryAnnualGradeReportOfStudentValidation & { files: never };
export type GetPrimaryAnnualGradeReportOfStudentResponse = PrimaryAnnualGradeReportDTO;
