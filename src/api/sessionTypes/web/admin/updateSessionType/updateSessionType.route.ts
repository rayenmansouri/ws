import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSessionTypeController } from "./updateSessionType.controller";
import { UpdateSessionTypeRouteConfig } from "./updateSessionType.types";
import { updateSessionTypeValidation } from "./updateSessionType.validation";

registerRoute<UpdateSessionTypeRouteConfig>()({
  path: "/session-types/:sessionTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSessionTypeValidation.body,
  paramSchema: updateSessionTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION_TYPE },
  controller: UpdateSessionTypeController,
  isTransactionEnabled: true,
  platform: "web",
});
