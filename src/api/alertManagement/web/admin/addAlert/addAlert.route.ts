import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddAlertController } from "./addAlert.controller";
import { AddAlertRouteConfig } from "./addAlert.types";
import { addAlertValidation } from "./addAlert.validation";

registerRoute<AddAlertRouteConfig>()({
  path: "/alerts",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addAlertValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ALERT },
  controller: AddAlertController,
  isTransactionEnabled: false,
  platform: "web",
});
