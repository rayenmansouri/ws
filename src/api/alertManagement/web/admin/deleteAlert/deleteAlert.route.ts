import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteAlertController } from "./deleteAlert.controller";
import { DeleteAlertRouteConfig } from "./deleteAlert.types";
import { deleteAlertValidation } from "./deleteAlert.validation";

registerRoute<DeleteAlertRouteConfig>()({
  path: "/alerts/:alertNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteAlertValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.ALERT },
  controller: DeleteAlertController,
  isTransactionEnabled: false,
  platform: "web",
});
