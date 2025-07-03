import { GradeReportTemplateDTO } from "../../../../../feature/gradeReportTemplate/dtos/gradeReportTemplate.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListGradeReportTemplatesValidation } from "./listGradeReportTemplates.validation";

export type ListGradeReportTemplatesRouteConfig = ListGradeReportTemplatesValidation & {
  files: never;
};
export type ListGradeReportTemplatesResponse = ResponseWithPagination<GradeReportTemplateDTO>;
