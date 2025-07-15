import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSessionTypeController } from "./addSessionType.controller";
import { AddSessionTypeRouteConfig } from "./addSessionType.types";
import { addSessionTypeValidation } from "./addSessionType.validation";

registerRoute<AddSessionTypeRouteConfig>()({
  path: "/session-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSessionTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION_TYPE },
  controller: AddSessionTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
