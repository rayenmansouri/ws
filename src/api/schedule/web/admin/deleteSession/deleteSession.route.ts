import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSessionController } from "./deleteSession.controller";
import { DeleteSessionRouteConfig } from "./deleteSession.types";
import { deleteSessionValidation } from "./deleteSession.validation";

registerRoute<DeleteSessionRouteConfig>()({
  path: "/sessions/:sessionNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSessionValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SESSION },
  controller: DeleteSessionController,
  isTransactionEnabled: true,
  platform: "web",
});
