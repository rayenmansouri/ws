import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListTransactionsController } from "./listTransactions.controller";
import { ListTransactionsRouteConfig } from "./listTransactions.types";
import { listTransactionsValidation } from "./listTransactions.validation";

registerRoute<ListTransactionsRouteConfig>()({
  path: "/transactions",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listTransactionsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TRANSACTION },
  controller: ListTransactionsController,
  isTransactionEnabled: false,
  platform: "web",
});
