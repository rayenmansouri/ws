import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentCambridgeAnnualGradeReportController } from "./getStudentCambridgeAnnualGradeReport.controller";
import { GetStudentCambridgeAnnualGradeReportRouteConfig } from "./getStudentCambridgeAnnualGradeReport.types";
import { getStudentCambridgeAnnualGradeReportValidation } from "./getStudentCambridgeAnnualGradeReport.validation";

registerRoute<GetStudentCambridgeAnnualGradeReportRouteConfig>()({
  path: "/cambridge/classes/:classNewId/students/:studentNewId/annual-grade-report",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getStudentCambridgeAnnualGradeReportValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetStudentCambridgeAnnualGradeReportController,
  isTransactionEnabled: false,
  platform: "web",
});
