import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListGradeReportTemplatesController } from "./listGradeReportTemplates.controller";
import { ListGradeReportTemplatesRouteConfig } from "./listGradeReportTemplates.types";
import { listGradeReportTemplatesValidation } from "./listGradeReportTemplates.validation";

registerRoute<ListGradeReportTemplatesRouteConfig>()({
  path: "/grade-report-templates",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listGradeReportTemplatesValidation.query,
  controller: ListGradeReportTemplatesController,
  isTransactionEnabled: false,
  platform: "web",
});
