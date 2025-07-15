import { SecondaryGradeReportStatsDTO } from "../../../../../feature/examGrade/dto/secondary/ScondaryGradeReportStats.dto";
import { GetSecondaryGradeReportStatsValidation } from "./getSecondaryGradeReportStats.validation";

export type GetSecondaryGradeReportStatsRouteConfig = GetSecondaryGradeReportStatsValidation & {
  files: never;
};
export type GetSecondaryGradeReportStatsResponse = SecondaryGradeReportStatsDTO;
