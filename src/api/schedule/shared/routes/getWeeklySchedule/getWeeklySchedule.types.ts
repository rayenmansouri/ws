import { WeeklySessionDTO } from "../../../../../feature/weeklySessions/dto/weeklySession.dto";
import { GetWeeklyScheduleValidation } from "./getWeeklySchedule.validation";

export type GetWeeklyScheduleRouteConfig = GetWeeklyScheduleValidation & { files: never };
export type GetWeeklyScheduleResponse = {
  schedule: WeeklySessionDTO[];
};
