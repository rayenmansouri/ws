import { PrimaryGradeReportStatsDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryGradeReportStats.dto";
import { GetPrimaryGradeReportStatsValidation } from "./getPrimaryGradeReportStats.validation";

export type GetPrimaryGradeReportStatsRouteConfig = GetPrimaryGradeReportStatsValidation & {
  files: never;
};
export type GetPrimaryGradeReportStatsResponse = PrimaryGradeReportStatsDTO;
