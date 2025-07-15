import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateGradeReportTemplateController } from "./updateGradeReportTemplate.controller";
import { UpdateGradeReportTemplateRouteConfig } from "./updateGradeReportTemplate.types";
import { updateGradeReportTemplateValidation } from "./updateGradeReportTemplate.validation";

registerRoute<UpdateGradeReportTemplateRouteConfig>()({
  path: "/grade-report-templates/:templateNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateGradeReportTemplateValidation.body,
  paramSchema: updateGradeReportTemplateValidation.params,
  controller: UpdateGradeReportTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
