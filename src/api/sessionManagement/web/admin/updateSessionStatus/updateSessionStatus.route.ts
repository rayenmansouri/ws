import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSessionStatusController } from "./updateSessionStatus.controller";
import { UpdateSessionStatusRouteConfig } from "./updateSessionStatus.types";
import { updateSessionStatusValidation } from "./updateSessionStatus.validation";

registerRoute<UpdateSessionStatusRouteConfig>()({
  path: "/session/:sessionNewId/change-status",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSessionStatusValidation.body,
  paramSchema: updateSessionStatusValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION },
  controller: UpdateSessionStatusController,
  isTransactionEnabled: true,
  platform: "web",
});
