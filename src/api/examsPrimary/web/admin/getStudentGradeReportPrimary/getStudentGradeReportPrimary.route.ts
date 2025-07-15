import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentGradeReportPrimaryController } from "./getStudentGradeReportPrimary.controller";
import { GetStudentGradeReportPrimaryRouteConfig } from "./getStudentGradeReportPrimary.types";
import { getStudentGradeReportPrimaryValidation } from "./getStudentGradeReportPrimary.validation";

registerRoute<GetStudentGradeReportPrimaryRouteConfig>()({
  path: "/primary/students/:studentNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getStudentGradeReportPrimaryValidation.query,
  paramSchema: getStudentGradeReportPrimaryValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetStudentGradeReportPrimaryController,
  isTransactionEnabled: false,
  platform: "web",
});
