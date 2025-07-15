import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnAssignStudentFromClassController } from "./unAssignStudentFromClass.controller";
import { UnAssignStudentFromClassRouteConfig } from "./unAssignStudentFromClass.types";
import { unAssignStudentFromClassValidation } from "./unAssignStudentFromClass.validation";

registerRoute<UnAssignStudentFromClassRouteConfig>()({
  path: "/class/:classNewId/unassign-students",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: unAssignStudentFromClassValidation.body,
  paramSchema: unAssignStudentFromClassValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: UnAssignStudentFromClassController,
  isTransactionEnabled: false,
  platform: "web",
});
