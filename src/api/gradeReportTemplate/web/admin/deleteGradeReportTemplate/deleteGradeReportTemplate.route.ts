import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteGradeReportTemplateController } from "./deleteGradeReportTemplate.controller";
import { DeleteGradeReportTemplateRouteConfig } from "./deleteGradeReportTemplate.types";
import { deleteGradeReportTemplateValidation } from "./deleteGradeReportTemplate.validation";

registerRoute<DeleteGradeReportTemplateRouteConfig>()({
  path: "/grade-report-templates/:templateNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteGradeReportTemplateValidation.params,
  controller: DeleteGradeReportTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
