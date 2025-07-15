import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddServiceController } from "./addService.controller";
import { AddServiceRouteConfig } from "./addService.types";
import { addServiceValidation } from "./addService.validation";

registerRoute<AddServiceRouteConfig>()({
  path: "/services",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addServiceValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SERVICE },
  controller: AddServiceController,
  isTransactionEnabled: false,
  platform: "web",
});
