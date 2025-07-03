import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSmartCalendarScheduleController } from "./deleteSmartCalendarSchedule.controller";
import { DeleteSmartCalendarScheduleRouteConfig } from "./deleteSmartCalendarSchedule.types";
import { deleteSmartCalendarScheduleValidation } from "./deleteSmartCalendarSchedule.validation";

registerRoute<DeleteSmartCalendarScheduleRouteConfig>()({
  path: "/smart-calendar-schedules/:smartCalendarScheduleNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSmartCalendarScheduleValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: DeleteSmartCalendarScheduleController,
  isTransactionEnabled: true,
  platform: "web",
});
