import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateBankTransferController } from "./updateBankTransfer.controller";
import { UpdateBankTransferRouteConfig } from "./updateBankTransfer.types";
import { updateBankTransferValidation } from "./updateBankTransfer.validation";

registerRoute<UpdateBankTransferRouteConfig>()({
  path: "/bank-transfers/:bankTransferNewId",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateBankTransferValidation.body,
  paramSchema: updateBankTransferValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ALERT },
  controller: UpdateBankTransferController,
  isTransactionEnabled: false,
  platform: "web",
});
