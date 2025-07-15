import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTransactionsController } from "./updateTransactions.controller";
import { UpdateTransactionsRouteConfig } from "./updateTransactions.types";
import { updateTransactionsValidation } from "./updateTransactions.validation";

registerRoute<UpdateTransactionsRouteConfig>()({
  path: "/finance/transactions/:transactionId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateTransactionsValidation.body,
  paramSchema: updateTransactionsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.TRANSACTION },
  controller: UpdateTransactionsController,
  isTransactionEnabled: false,
  platform: "web",
});
