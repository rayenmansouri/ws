import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTermController } from "./addTerm.controller";
import { AddTermRouteConfig } from "./addTerm.types";
import { addTermValidation } from "./addTerm.validation";

registerRoute<AddTermRouteConfig>()({
  path: "/terms",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addTermValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.TERM },
  controller: AddTermController,
  isTransactionEnabled: false,
  platform: "web",
});
