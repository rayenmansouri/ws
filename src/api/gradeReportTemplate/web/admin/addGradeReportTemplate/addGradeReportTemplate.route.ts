import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddGradeReportTemplateController } from "./addGradeReportTemplate.controller";
import { AddGradeReportTemplateRouteConfig } from "./addGradeReportTemplate.types";
import { addGradeReportTemplateValidation } from "./addGradeReportTemplate.validation";

registerRoute<AddGradeReportTemplateRouteConfig>()({
  path: "/grade-report-templates",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addGradeReportTemplateValidation.body,
  controller: AddGradeReportTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
