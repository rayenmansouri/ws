import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { SwitchShoolController } from "./switchShool.controller";
import { SwitchShoolRouteConfig } from "./switchShool.types";
import { switchShoolValidation } from "./switchShool.validation";

registerRoute<SwitchShoolRouteConfig>()({
  path: "/schools/:schoolNewId/switch",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  paramSchema: switchShoolValidation.params,
  authorization: { action: ACTION_ENUM.SWITCH, resource: RESOURCES_ENUM.SCHOOL },
  controller: SwitchShoolController,
  isTransactionEnabled: false,
  platform: "web",
});
