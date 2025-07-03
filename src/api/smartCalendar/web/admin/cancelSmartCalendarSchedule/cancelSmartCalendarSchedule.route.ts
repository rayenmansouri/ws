import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { CancelSmartCalendarScheduleController } from "./cancelSmartCalendarSchedule.controller";
import { CancelSmartCalendarScheduleRouteConfig } from "./cancelSmartCalendarSchedule.types";
import { cancelSmartCalendarScheduleValidation } from "./cancelSmartCalendarSchedule.validation";

registerRoute<CancelSmartCalendarScheduleRouteConfig>()({
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId/cancel",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: cancelSmartCalendarScheduleValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: CancelSmartCalendarScheduleController,
  isTransactionEnabled: false,
  platform: "web",
});
