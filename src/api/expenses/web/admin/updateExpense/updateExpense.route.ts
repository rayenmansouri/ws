import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateExpenseController } from "./updateExpense.controller";
import { UpdateExpenseRouteConfig } from "./updateExpense.types";
import { updateExpenseValidation } from "./updateExpense.validation";

registerRoute<UpdateExpenseRouteConfig>()({
  path: "/expenses/:expenseNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateExpenseValidation.body,
  paramSchema: updateExpenseValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXPENSE },
  controller: UpdateExpenseController,
  isTransactionEnabled: false,
  platform: "web",
});
