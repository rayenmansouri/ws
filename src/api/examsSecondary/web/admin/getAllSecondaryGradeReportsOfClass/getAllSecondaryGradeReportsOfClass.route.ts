import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllSecondaryGradeReportsOfClassController } from "./getAllSecondaryGradeReportsOfClass.controller";
import { GetAllSecondaryGradeReportsOfClassRouteConfig } from "./getAllSecondaryGradeReportsOfClass.types";
import { getAllSecondaryGradeReportsOfClassValidation } from "./getAllSecondaryGradeReportsOfClass.validation";

registerRoute<GetAllSecondaryGradeReportsOfClassRouteConfig>()({
  path: "/secondary/classes/:classNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAllSecondaryGradeReportsOfClassValidation.query,
  paramSchema: getAllSecondaryGradeReportsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllSecondaryGradeReportsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
