import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { CancelSessionController } from "./cancelSession.controller";
import { CancelSessionRouteConfig } from "./cancelSession.types";
import { cancelSessionValidation } from "./cancelSession.validation";

registerRoute<CancelSessionRouteConfig>()({
  path: "/session/:sessionNewId/cancel",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: cancelSessionValidation.body,
  paramSchema: cancelSessionValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION },
  controller: CancelSessionController,
  isTransactionEnabled: true,
  platform: "web",
});
