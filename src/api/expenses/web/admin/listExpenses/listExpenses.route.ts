import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListExpensesController } from "./listExpenses.controller";
import { ListExpensesRouteConfig } from "./listExpenses.types";
import { listExpensesValidation } from "./listExpenses.validation";

registerRoute<ListExpensesRouteConfig>()({
  path: "/expenses",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listExpensesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXPENSE },
  controller: ListExpensesController,
  isTransactionEnabled: false,
  platform: "web",
});
