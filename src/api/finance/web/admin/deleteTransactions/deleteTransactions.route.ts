import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteTransactionsController } from "./deleteTransactions.controller";
import { DeleteTransactionsRouteConfig } from "./deleteTransactions.types";
import { deleteTransactionsValidation } from "./deleteTransactions.validation";

registerRoute<DeleteTransactionsRouteConfig>()({
  path: "/finance/transactions",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deleteTransactionsValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.TRANSACTION },
  controller: DeleteTransactionsController,
  isTransactionEnabled: false,
  platform: "web",
});
