import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetOnePreRegistrationController } from "./getOnePreRegistration.controller";
import { GetOnePreRegistrationRouteConfig } from "./getOnePreRegistration.types";
import { getOnePreRegistrationValidation } from "./getOnePreRegistration.validation";

registerRoute<GetOnePreRegistrationRouteConfig>()({
  path: "/pre-registrations/:preRegistrationId",
  method: "get",
  querySchema: getOnePreRegistrationValidation.query,
  paramSchema: getOnePreRegistrationValidation.params,
  controller: GetOnePreRegistrationController,
  isPublic: true,
  platform: "web",
});
