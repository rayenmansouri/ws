import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteExpenseController } from "./deleteExpense.controller";
import { DeleteExpenseRouteConfig } from "./deleteExpense.types";
import { deleteExpenseValidation } from "./deleteExpense.validation";

registerRoute<DeleteExpenseRouteConfig>()({
  path: "/expenses/:expenseNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteExpenseValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.EXPENSE },
  controller: DeleteExpenseController,
  isTransactionEnabled: false,
  platform: "web",
});
