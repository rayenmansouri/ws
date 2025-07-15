import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSessionForGroupController } from "./updateSessionForGroup.controller";
import { UpdateSessionForGroupRouteConfig } from "./updateSessionForGroup.types";
import { updateSessionForGroupValidation } from "./updateSessionForGroup.validation";

registerRoute<UpdateSessionForGroupRouteConfig>()({
  path: "/groups/sessions/:sessionNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSessionForGroupValidation.body,
  paramSchema: updateSessionForGroupValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION },
  controller: UpdateSessionForGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
