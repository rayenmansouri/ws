import { SecondaryGradeReportDTO } from "../../../../../feature/examGrade/dto/secondary/SecondaryGradeReport.dto";
import { GetStudentGradeReportSecondaryValidation } from "./getStudentGradeReportSecondary.validation";

export type GetStudentGradeReportSecondaryRouteConfig = GetStudentGradeReportSecondaryValidation & {
  files: never;
};
export type GetStudentGradeReportSecondaryResponse = SecondaryGradeReportDTO;
