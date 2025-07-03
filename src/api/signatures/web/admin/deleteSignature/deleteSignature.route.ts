import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSignatureController } from "./deleteSignature.controller";
import { DeleteSignatureRouteConfig } from "./deleteSignature.types";
import { deleteSignatureValidation } from "./deleteSignature.validation";

registerRoute<DeleteSignatureRouteConfig>()({
  path: "/signatures/:signatureNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SIGNATURE },
  paramSchema: deleteSignatureValidation.params,
  controller: DeleteSignatureController,
  isTransactionEnabled: false,
  platform: "web",
});
