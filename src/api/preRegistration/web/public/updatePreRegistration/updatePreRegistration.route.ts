import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdatePreRegistrationController } from "./updatePreRegistration.controller";
import { UpdatePreRegistrationRouteConfig } from "./updatePreRegistration.types";
import { updatePreRegistrationValidation } from "./updatePreRegistration.validation";

registerRoute<UpdatePreRegistrationRouteConfig>()({
  path: "/pre-registration",
  method: "patch",
  isPublic: true,
  bodySchema: updatePreRegistrationValidation.body,
  controller: UpdatePreRegistrationController,
  isTransactionEnabled: true,
  authorization: undefined,
  endUser: undefined,
  platform: "web",
  upload: { fields: [{ name: "birthCertificate" }, { name: "previousTranscripts" }] },
});
