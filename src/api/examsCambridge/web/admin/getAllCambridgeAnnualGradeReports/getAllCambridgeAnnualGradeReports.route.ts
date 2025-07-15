import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllCambridgeAnnualGradeReportsController } from "./getAllCambridgeAnnualGradeReports.controller";
import { GetAllCambridgeAnnualGradeReportsRouteConfig } from "./getAllCambridgeAnnualGradeReports.types";
import { getAllCambridgeAnnualGradeReportsValidation } from "./getAllCambridgeAnnualGradeReports.validation";

registerRoute<GetAllCambridgeAnnualGradeReportsRouteConfig>()({
  path: "/cambridge/classes/:classNewId/annual-grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getAllCambridgeAnnualGradeReportsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllCambridgeAnnualGradeReportsController,
  isTransactionEnabled: false,
  platform: "web",
});
