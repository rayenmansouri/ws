import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ApplySmartCalendarScheduleController } from "./applySmartCalendarSchedule.controller";
import { ApplySmartCalendarScheduleRouteConfig } from "./applySmartCalendarSchedule.types";
import { applySmartCalendarScheduleValidation } from "./applySmartCalendarSchedule.validation";

registerRoute<ApplySmartCalendarScheduleRouteConfig>()({
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId/apply",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: applySmartCalendarScheduleValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: ApplySmartCalendarScheduleController,
  isTransactionEnabled: true,
  platform: "web",
});
