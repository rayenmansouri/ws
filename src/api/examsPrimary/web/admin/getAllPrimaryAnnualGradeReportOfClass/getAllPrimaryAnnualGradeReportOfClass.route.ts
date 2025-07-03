import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllPrimaryAnnualGradeReportOfClassController } from "./getAllPrimaryAnnualGradeReportOfClass.controller";
import { GetAllPrimaryAnnualGradeReportOfClassRouteConfig } from "./getAllPrimaryAnnualGradeReportOfClass.types";
import { getAllPrimaryAnnualGradeReportOfClassValidation } from "./getAllPrimaryAnnualGradeReportOfClass.validation";

registerRoute<GetAllPrimaryAnnualGradeReportOfClassRouteConfig>()({
  path: "/primary/classes/:classNewId/annual-grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getAllPrimaryAnnualGradeReportOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllPrimaryAnnualGradeReportOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
