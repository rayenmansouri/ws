import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { SwitchToUserController } from "./switchToUser.controller";
import { SwitchToUserRouteConfig } from "./switchToUser.types";
import { switchToUserValidation } from "./switchToUser.validation";

registerRoute<SwitchToUserRouteConfig>()({
  path: "/switch-to-user",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: switchToUserValidation.body,
  authorization: { action: ACTION_ENUM.SWITCH, resource: RESOURCES_ENUM.STUDENT },
  controller: SwitchToUserController,
  isTransactionEnabled: false,
  platform: "web",
});
