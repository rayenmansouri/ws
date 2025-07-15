import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolLogoController } from "./getSchoolLogo.controller";
import { GetSchoolLogoRouteConfig } from "./getSchoolLogo.types";
import { getSchoolLogoValidation } from "./getSchoolLogo.validation";

registerRoute<GetSchoolLogoRouteConfig>()({
  path: "/schools/:schoolId/logo",
  method: "get",
  endUser: undefined,
  paramSchema: getSchoolLogoValidation.params,
  controller: GetSchoolLogoController,
  isTransactionEnabled: false,
  platform: "web",
  isPublic: true,
});
