import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolConfigController } from "./getSchoolConfig.controller";
import { GetSchoolConfigRouteConfig } from "./getSchoolConfig.types";
import { getSchoolConfigValidation } from "./getSchoolConfig.validation";

registerRoute<GetSchoolConfigRouteConfig>()({
  path: "/schools/:subdomain/config",
  method: "get",
  paramSchema: getSchoolConfigValidation.params,
  controller: GetSchoolConfigController,
  isTransactionEnabled: false,
  platform: "web",
  isPublic: true,
  endUser: undefined,
});
