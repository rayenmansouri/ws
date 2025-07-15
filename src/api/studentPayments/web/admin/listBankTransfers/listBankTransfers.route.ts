import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListBankTransfersController } from "./listBankTransfers.controller";
import { ListBankTransfersRouteConfig } from "./listBankTransfers.types";
import { listBankTransfersValidation } from "./listBankTransfers.validation";

registerRoute<ListBankTransfersRouteConfig>()({
  path: "/bank-transfers",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listBankTransfersValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.BANK_TRANSFER },
  controller: ListBankTransfersController,
  isTransactionEnabled: false,
  platform: "web",
});
