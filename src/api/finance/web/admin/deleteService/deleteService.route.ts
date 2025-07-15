import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteServiceController } from "./deleteService.controller";
import { DeleteServiceRouteConfig } from "./deleteService.types";
import { deleteServiceValidation } from "./deleteService.validation";

registerRoute<DeleteServiceRouteConfig>()({
  path: "/services",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deleteServiceValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SERVICE },
  controller: DeleteServiceController,
  isTransactionEnabled: true,
  platform: "web",
});
