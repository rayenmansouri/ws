import { SmartCalendarScheduleDTO } from "../../../../../feature/smartCalendar/dtos/SmartCalendarSchedule.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSmartCalendarScheduleValidation } from "./listSmartCalendarSchedule.validation";

export type ListSmartCalendarScheduleRouteConfig = ListSmartCalendarScheduleValidation & {
  files: never;
};
export type ListSmartCalendarScheduleResponse = ResponseWithPagination<SmartCalendarScheduleDTO>;
