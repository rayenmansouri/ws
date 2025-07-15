import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteWeeklySessionController } from "./deleteWeeklySession.controller";
import { DeleteWeeklySessionRouteConfig } from "./deleteWeeklySession.types";
import { deleteWeeklySessionValidation } from "./deleteWeeklySession.validation";

registerRoute<DeleteWeeklySessionRouteConfig>()({
  path: "/weekly-session/:weeklySessionNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteWeeklySessionValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SESSION },
  controller: DeleteWeeklySessionController,
  isTransactionEnabled: false,
  platform: "web",
});
