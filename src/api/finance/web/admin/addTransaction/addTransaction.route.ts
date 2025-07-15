import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTransactionController } from "./addTransaction.controller";
import { AddTransactionRouteConfig } from "./addTransaction.types";
import { addTransactionValidation } from "./addTransaction.validation";

registerRoute<AddTransactionRouteConfig>()({
  path: "/transaction",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addTransactionValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.TRANSACTION },
  controller: AddTransactionController,
  isTransactionEnabled: false,
  platform: "web",
});
