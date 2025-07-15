import { SecondaryGradeReportDTO } from "../../../../../feature/examGrade/dto/secondary/SecondaryGradeReport.dto";
import { GetAllSecondaryGradeReportsOfClassValidation } from "./getAllSecondaryGradeReportsOfClass.validation";

export type GetAllSecondaryGradeReportsOfClassRouteConfig =
  GetAllSecondaryGradeReportsOfClassValidation & { files: never };
export type GetAllSecondaryGradeReportsOfClassResponse = SecondaryGradeReportDTO[];
