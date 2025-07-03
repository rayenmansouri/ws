import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateAppVersionController } from "./updateAppVersion.controller";
import { UpdateAppVersionRouteConfig } from "./updateAppVersion.types";
import { updateAppVersionValidation } from "./updateAppVersion.validation";

registerRoute<UpdateAppVersionRouteConfig>()({
  path: "/app-versions",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateAppVersionValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.APP_VERSION },
  controller: UpdateAppVersionController,
  isTransactionEnabled: false,
  platform: "web",
});
