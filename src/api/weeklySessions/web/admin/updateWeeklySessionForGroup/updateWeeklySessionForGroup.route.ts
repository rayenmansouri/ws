import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateWeeklySessionForGroupController } from "./updateWeeklySessionForGroup.controller";
import { UpdateWeeklySessionForGroupRouteConfig } from "./updateWeeklySessionForGroup.types";
import { updateWeeklySessionForGroupValidation } from "./updateWeeklySessionForGroup.validation";

registerRoute<UpdateWeeklySessionForGroupRouteConfig>()({
  path: "/groups/weekly-sessions/:weeklySessionNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateWeeklySessionForGroupValidation.body,
  paramSchema: updateWeeklySessionForGroupValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHEDULE },
  controller: UpdateWeeklySessionForGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
