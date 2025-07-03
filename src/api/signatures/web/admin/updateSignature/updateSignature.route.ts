import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSignatureController } from "./updateSignature.controller";
import { UpdateSignatureRouteConfig } from "./updateSignature.types";
import { updateSignatureValidation } from "./updateSignature.validation";

registerRoute<UpdateSignatureRouteConfig>()({
  path: "/signatures/:signatureNewId",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SIGNATURE },
  bodySchema: updateSignatureValidation.body,
  paramSchema: updateSignatureValidation.params,
  controller: UpdateSignatureController,
  isTransactionEnabled: false,
  platform: "web",
  upload: {
    fields: [{ name: "image", maxCount: 1 }],
  },
});
