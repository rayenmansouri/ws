import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSessionTypeController } from "./listSessionType.controller";
import { ListSessionTypeRouteConfig } from "./listSessionType.types";
import { listSessionTypeValidation } from "./listSessionType.validation";

registerRoute<ListSessionTypeRouteConfig>()({
  path: "/session-types",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSessionTypeValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SESSION_TYPE },
  controller: ListSessionTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
