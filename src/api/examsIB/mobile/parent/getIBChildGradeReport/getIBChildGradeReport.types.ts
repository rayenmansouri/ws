import { GetIBChildGradeReportValidation } from "./getIBChildGradeReport.validation";
import { ChildIBGradeReportDto } from "../../../../../feature/examGrade/dto/ib/ChildIBGradeReport.dto";

export type GetIBChildGradeReportRouteConfig = GetIBChildGradeReportValidation & { files: never };
export type GetIBChildGradeReportResponse = ChildIBGradeReportDto;
