import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdatePreRegistrationController } from "./updatePreRegistration.controller";
import { UpdatePreRegistrationRouteConfig } from "./updatePreRegistration.types";
import { updatePreRegistrationValidation } from "./updatePreRegistration.validation";

registerRoute<UpdatePreRegistrationRouteConfig>()({
  path: "/pre-registration/:preRegistrationId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updatePreRegistrationValidation.body,
  paramSchema: updatePreRegistrationValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PRE_REGISTRATION },
  controller: UpdatePreRegistrationController,
  isTransactionEnabled: false,
  platform: "web",
  upload: {
    fields: [{ name: "birthCertificate" }, { name: "previousTranscripts" }],
  },
});
