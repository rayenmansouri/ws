import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetPrimaryAnnualGradeReportOfStudentController } from "./getPrimaryAnnualGradeReportOfStudent.controller";
import { GetPrimaryAnnualGradeReportOfStudentRouteConfig } from "./getPrimaryAnnualGradeReportOfStudent.types";
import { getPrimaryAnnualGradeReportOfStudentValidation } from "./getPrimaryAnnualGradeReportOfStudent.validation";

registerRoute<GetPrimaryAnnualGradeReportOfStudentRouteConfig>()({
  path: "/primary/classes/:classNewId/students/:studentNewId/annual-grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getPrimaryAnnualGradeReportOfStudentValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetPrimaryAnnualGradeReportOfStudentController,
  isTransactionEnabled: false,
  platform: "web",
});
