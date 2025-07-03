import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AssignStudentToGroupController } from "./assignStudentToGroup.controller";
import { AssignStudentToGroupRouteConfig } from "./assignStudentToGroup.types";
import { assignStudentToGroupValidation } from "./assignStudentToGroup.validation";

registerRoute<AssignStudentToGroupRouteConfig>()({
  path: "/groups/:groupNewId/assign-students",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: assignStudentToGroupValidation.body,
  paramSchema: assignStudentToGroupValidation.params,
  authorization: { action: ACTION_ENUM.ASSIGN, resource: RESOURCES_ENUM.STUDENT },
  controller: AssignStudentToGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
