import { PrimaryGradeReportDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryGradeReport.dto";
import { GetAllPrimaryGradeReportsOfClassValidation } from "./getAllPrimaryGradeReportsOfClass.validation";

export type GetAllPrimaryGradeReportsOfClassRouteConfig =
  GetAllPrimaryGradeReportsOfClassValidation & { files: never };
export type GetAllPrimaryGradeReportsOfClassResponse = PrimaryGradeReportDTO[];
