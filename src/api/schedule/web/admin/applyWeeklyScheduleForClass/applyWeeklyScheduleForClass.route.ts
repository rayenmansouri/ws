import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ApplyWeeklyScheduleForClassController } from "./applyWeeklyScheduleForClass.controller";
import { ApplyWeeklyScheduleForClassRouteConfig } from "./applyWeeklyScheduleForClass.types";
import { applyWeeklyScheduleForClassValidation } from "./applyWeeklyScheduleForClass.validation";

registerRoute<ApplyWeeklyScheduleForClassRouteConfig>()({
  path: "/class/apply-weekly-schedule",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: applyWeeklyScheduleForClassValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION },
  controller: ApplyWeeklyScheduleForClassController,
  isTransactionEnabled: true,
  platform: "web",
});
