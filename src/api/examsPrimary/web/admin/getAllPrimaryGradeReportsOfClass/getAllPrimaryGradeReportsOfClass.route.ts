import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllPrimaryGradeReportsOfClassController } from "./getAllPrimaryGradeReportsOfClass.controller";
import { GetAllPrimaryGradeReportsOfClassRouteConfig } from "./getAllPrimaryGradeReportsOfClass.types";
import { getAllPrimaryGradeReportsOfClassValidation } from "./getAllPrimaryGradeReportsOfClass.validation";

registerRoute<GetAllPrimaryGradeReportsOfClassRouteConfig>()({
  path: "/primary/classes/:classNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAllPrimaryGradeReportsOfClassValidation.query,
  paramSchema: getAllPrimaryGradeReportsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllPrimaryGradeReportsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
