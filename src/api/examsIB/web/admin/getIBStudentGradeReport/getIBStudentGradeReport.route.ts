import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBStudentGradeReportController } from "./getIBStudentGradeReport.controller";
import { GetIBStudentGradeReportRouteConfig } from "./getIBStudentGradeReport.types";
import { getIBStudentGradeReportValidation } from "./getIBStudentGradeReport.validation";

registerRoute<GetIBStudentGradeReportRouteConfig>()({
  path: "/ib/students/:studentNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getIBStudentGradeReportValidation.query,
  paramSchema: getIBStudentGradeReportValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetIBStudentGradeReportController,
  isTransactionEnabled: false,
  platform: "web",
});
