import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSessionTypeController } from "./DeleteSessionType.controller";
import { DeleteSessionTypeRouteConfig } from "./DeleteSessionType.types";
import { DeleteSessionTypeValidation } from "./DeleteSessionType.validation";

registerRoute<DeleteSessionTypeRouteConfig>()({
  path: "/session-types/:sessionTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: DeleteSessionTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SESSION_TYPE },
  controller: DeleteSessionTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
