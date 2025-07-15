import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentGradeReportCambridgeController } from "./getStudentGradeReportCambridge.controller";
import { GetStudentGradeReportCambridgeRouteConfig } from "./getStudentGradeReportCambridge.types";
import { getStudentGradeReportCambridgeValidation } from "./getStudentGradeReportCambridge.validation";

registerRoute<GetStudentGradeReportCambridgeRouteConfig>()({
  path: "/cambridge/students/:studentNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getStudentGradeReportCambridgeValidation.query,
  paramSchema: getStudentGradeReportCambridgeValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetStudentGradeReportCambridgeController,
  isTransactionEnabled: false,
  platform: "web",
});
