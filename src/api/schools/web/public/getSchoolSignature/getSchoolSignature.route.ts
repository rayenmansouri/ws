import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolSignatureController } from "./getSchoolSignature.controller";
import { GetSchoolSignatureRouteConfig } from "./getSchoolSignature.types";
import { getSchoolSignatureValidation } from "./getSchoolSignature.validation";

registerRoute<GetSchoolSignatureRouteConfig>()({
  path: "/schools/:schoolId/signature",
  method: "get",
  endUser: undefined,
  paramSchema: getSchoolSignatureValidation.params,
  querySchema: getSchoolSignatureValidation.query,
  controller: GetSchoolSignatureController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: "web",
});
