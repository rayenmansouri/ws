import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAllCambridgeGradeReportsOfClassController } from "./getAllCambridgeGradeReportsOfClass.controller";
import { GetAllCambridgeGradeReportsOfClassRouteConfig } from "./getAllCambridgeGradeReportsOfClass.types";
import { getAllCambridgeGradeReportsOfClassValidation } from "./getAllCambridgeGradeReportsOfClass.validation";

registerRoute<GetAllCambridgeGradeReportsOfClassRouteConfig>()({
  path: "/cambridge/classes/:classNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAllCambridgeGradeReportsOfClassValidation.query,
  paramSchema: getAllCambridgeGradeReportsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetAllCambridgeGradeReportsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
