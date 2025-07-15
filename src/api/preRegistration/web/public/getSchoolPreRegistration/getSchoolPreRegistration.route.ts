import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolPreRegistrationController } from "./getSchoolPreRegistration.controller";
import { GetSchoolPreRegistrationRouteConfig } from "./getSchoolPreRegistration.types";
import { getSchoolPreRegistrationValidation } from "./getSchoolPreRegistration.validation";

registerRoute<GetSchoolPreRegistrationRouteConfig>()({
  path: "/pre-registration-school",
  method: "get",
  querySchema: getSchoolPreRegistrationValidation.query,
  controller: GetSchoolPreRegistrationController,
  isTransactionEnabled: false,
  platform: "web",
  isPublic: true,
});
