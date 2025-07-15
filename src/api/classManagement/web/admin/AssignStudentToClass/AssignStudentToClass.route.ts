import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AssignStudentToClassController } from "./AssignStudentToClass.controller";
import { AssignStudentToClassRouteConfig } from "./AssignStudentToClass.types";
import { AssignStudentToClassValidation } from "./AssignStudentToClass.validation";

registerRoute<AssignStudentToClassRouteConfig>()({
  path: "/class/:classNewId/assign-students",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: AssignStudentToClassValidation.body,
  paramSchema: AssignStudentToClassValidation.params,
  authorization: { action: ACTION_ENUM.ASSIGN, resource: RESOURCES_ENUM.STUDENT },
  controller: AssignStudentToClassController,
  isTransactionEnabled: true,
  platform: "web",
});
