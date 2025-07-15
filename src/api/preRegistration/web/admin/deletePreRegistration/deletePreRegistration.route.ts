import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeletePreRegistrationController } from "./deletePreRegistration.controller";
import { DeletePreRegistrationRouteConfig } from "./deletePreRegistration.types";
import { deletePreRegistrationValidation } from "./deletePreRegistration.validation";

registerRoute<DeletePreRegistrationRouteConfig>()({
  path: "/pre-registrations/:preRegistrationId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deletePreRegistrationValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.PRE_REGISTRATION },
  controller: DeletePreRegistrationController,
  isTransactionEnabled: false,
  platform: "web",
});
