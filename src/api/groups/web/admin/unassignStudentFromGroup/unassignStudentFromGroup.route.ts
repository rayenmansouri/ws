import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnassignStudentFromGroupController } from "./unassignStudentFromGroup.controller";
import { UnassignStudentFromGroupRouteConfig } from "./unassignStudentFromGroup.types";
import { unassignStudentFromGroupValidation } from "./unassignStudentFromGroup.validation";

registerRoute<UnassignStudentFromGroupRouteConfig>()({
  path: "/groups/:groupNewId/unassign-students",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: unassignStudentFromGroupValidation.body,
  paramSchema: unassignStudentFromGroupValidation.params,
  authorization: { action: ACTION_ENUM.UNASSIGN, resource: RESOURCES_ENUM.STUDENT },
  controller: UnassignStudentFromGroupController,
  isTransactionEnabled: true,
  platform: "web",
});
