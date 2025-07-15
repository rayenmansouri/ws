import { WeeklySessionDTO } from "../../../../../feature/weeklySessions/dto/weeklySession.dto";
import { GetDraftWeeklyScheduleValidation } from "./getDraftWeeklySchedule.validation";

export type GetDraftWeeklyScheduleRouteConfig = GetDraftWeeklyScheduleValidation & { files: never };
export type GetDraftWeeklyScheduleResponse = WeeklySessionDTO[];
