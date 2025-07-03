import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSmartCalendarScheduleController } from "./listSmartCalendarSchedule.controller";
import { ListSmartCalendarScheduleRouteConfig } from "./listSmartCalendarSchedule.types";
import { listSmartCalendarScheduleValidation } from "./listSmartCalendarSchedule.validation";

registerRoute<ListSmartCalendarScheduleRouteConfig>()({
  path: "/smart-calendar-schedules",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSmartCalendarScheduleValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: ListSmartCalendarScheduleController,
  isTransactionEnabled: false,
  platform: "web",
});
