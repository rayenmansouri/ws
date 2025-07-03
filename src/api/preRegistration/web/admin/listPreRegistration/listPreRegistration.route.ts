import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListPreRegistrationController } from "./listPreRegistration.controller";
import { ListPreRegistrationRouteConfig } from "./listPreRegistration.types";
import { listPreRegistrationValidation } from "./listPreRegistration.validation";

registerRoute<ListPreRegistrationRouteConfig>()({
  path: "/pre-registrations",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listPreRegistrationValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PRE_REGISTRATION },
  controller: ListPreRegistrationController,
  isTransactionEnabled: false,
  platform: "web",
});
