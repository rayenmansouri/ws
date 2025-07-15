import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateServiceController } from "./updateService.controller";
import { UpdateServiceRouteConfig } from "./updateService.types";
import { updateServiceValidation } from "./updateService.validation";

registerRoute<UpdateServiceRouteConfig>()({
  path: "/services/:serviceId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateServiceValidation.body,
  paramSchema: updateServiceValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SERVICE },
  controller: UpdateServiceController,
  isTransactionEnabled: false,
  platform: "web",
});
