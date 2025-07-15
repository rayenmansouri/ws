import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddExpenseController } from "./addExpense.controller";
import { AddExpenseRouteConfig } from "./addExpense.types";
import { addExpenseValidation } from "./addExpense.validation";

registerRoute<AddExpenseRouteConfig>()({
  path: "/expenses",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addExpenseValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.EXPENSE },
  controller: AddExpenseController,
  isTransactionEnabled: false,
  platform: "web",
});
