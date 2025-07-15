import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSmartCalendarScheduleController } from "./updateSmartCalendarSchedule.controller";
import { UpdateSmartCalendarScheduleRouteConfig } from "./updateSmartCalendarSchedule.types";
import { updateSmartCalendarScheduleValidation } from "./updateSmartCalendarSchedule.validation";

registerRoute<UpdateSmartCalendarScheduleRouteConfig>()({
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSmartCalendarScheduleValidation.body,
  paramSchema: updateSmartCalendarScheduleValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: UpdateSmartCalendarScheduleController,
  isTransactionEnabled: false,
  platform: "web",
});
