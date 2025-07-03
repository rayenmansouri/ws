import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllIBGradeReportsOfClassController } from "./getAllIBGradeReportsOfClass.controller";
import { GetAllIBGradeReportsOfClassRouteConfig } from "./getAllIBGradeReportsOfClass.types";
import { getAllIBGradeReportsOfClassValidation } from "./getAllIBGradeReportsOfClass.validation";

registerRoute<GetAllIBGradeReportsOfClassRouteConfig>()({
  path: "/ib/classes/:classNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAllIBGradeReportsOfClassValidation.query,
  paramSchema: getAllIBGradeReportsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllIBGradeReportsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
