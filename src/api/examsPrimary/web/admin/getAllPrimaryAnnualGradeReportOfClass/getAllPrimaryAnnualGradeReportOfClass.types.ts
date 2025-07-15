import { PrimaryAnnualGradeReportDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryAnnualGradeReport.dto";
import { GetAllPrimaryAnnualGradeReportOfClassValidation } from "./getAllPrimaryAnnualGradeReportOfClass.validation";

export type GetAllPrimaryAnnualGradeReportOfClassRouteConfig =
  GetAllPrimaryAnnualGradeReportOfClassValidation & { files: never };
export type GetAllPrimaryAnnualGradeReportOfClassResponse = PrimaryAnnualGradeReportDTO[];
