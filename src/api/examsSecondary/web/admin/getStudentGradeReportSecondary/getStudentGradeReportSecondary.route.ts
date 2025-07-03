import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentGradeReportSecondaryController } from "./getStudentGradeReportSecondary.controller";
import { GetStudentGradeReportSecondaryRouteConfig } from "./getStudentGradeReportSecondary.types";
import { getStudentGradeReportSecondaryValidation } from "./getStudentGradeReportSecondary.validation";

registerRoute<GetStudentGradeReportSecondaryRouteConfig>()({
  path: "/secondary/students/:studentNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getStudentGradeReportSecondaryValidation.query,
  paramSchema: getStudentGradeReportSecondaryValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetStudentGradeReportSecondaryController,
  isTransactionEnabled: false,
  platform: "web",
});
