import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddWeeklySessionForGroupController } from "./addWeeklySessionForGroup.controller";
import { AddWeeklySessionForGroupRouteConfig } from "./addWeeklySessionForGroup.types";
import { addWeeklySessionForGroupValidation } from "./addWeeklySessionForGroup.validation";

registerRoute<AddWeeklySessionForGroupRouteConfig>()({
  path: "/groups/weekly-sessions",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addWeeklySessionForGroupValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION },
  controller: AddWeeklySessionForGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
