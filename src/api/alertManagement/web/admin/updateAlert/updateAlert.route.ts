import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateAlertController } from "./updateAlert.controller";
import { UpdateAlertRouteConfig } from "./updateAlert.types";
import { updateAlertValidation } from "./updateAlert.validation";

registerRoute<UpdateAlertRouteConfig>()({
  path: "/alerts/:alertNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateAlertValidation.body,
  paramSchema: updateAlertValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ALERT },
  controller: UpdateAlertController,
  isTransactionEnabled: false,
  platform: "web",
});
