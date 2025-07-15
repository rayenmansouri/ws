import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ApplyWeeklyScheduleForGroupController } from "./applyWeeklyScheduleForGroup.controller";
import { ApplyWeeklyScheduleForGroupRouteConfig } from "./applyWeeklyScheduleForGroup.types";
import { applyWeeklyScheduleForGroupValidation } from "./applyWeeklyScheduleForGroup.validation";

registerRoute<ApplyWeeklyScheduleForGroupRouteConfig>()({
  path: "/group/apply-weekly-schedule",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: applyWeeklyScheduleForGroupValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION },
  controller: ApplyWeeklyScheduleForGroupController,
  isTransactionEnabled: true,
  platform: "web",
});
