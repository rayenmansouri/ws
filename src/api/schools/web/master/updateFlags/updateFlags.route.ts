import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateFlagsController } from "./updateFlags.controller";
import { UpdateFlagsRouteConfig } from "./updateFlags.types";
import { updateFlagsValidation } from "./updateFlags.validation";

registerRoute<UpdateFlagsRouteConfig>()({
  path: "/schools/:schoolNewId/flags",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateFlagsValidation.body,
  paramSchema: updateFlagsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.FLAGS },
  controller: UpdateFlagsController,
  isTransactionEnabled: false,
  platform: "web",
});
