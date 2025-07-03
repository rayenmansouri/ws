import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { RegisterStudentController } from "./registerStudent.controller";
import { RegisterStudentRouteConfig } from "./registerStudent.types";
import { registerStudentValidation } from "./registerStudent.validation";

registerRoute<RegisterStudentRouteConfig>()({
  path: "/pre-registration/:preRegistrationId/register-student",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: registerStudentValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PRE_REGISTRATION },
  controller: RegisterStudentController,
  isTransactionEnabled: true,
  platform: "web",
});
