import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSignatureController } from "./addSignature.controller";
import { AddSignatureRouteConfig } from "./addSignature.types";
import { addSignatureValidation } from "./addSignature.validation";

registerRoute<AddSignatureRouteConfig>()({
  path: "/signatures",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SIGNATURE },
  bodySchema: addSignatureValidation.body,
  controller: AddSignatureController,
  isTransactionEnabled: false,
  platform: "web",
  upload: {
    fields: [{ name: "image", maxCount: 1 }],
  },
});
