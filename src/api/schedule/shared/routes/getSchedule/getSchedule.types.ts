import { SessionDTO } from "../../../../../feature/sessionManagement/dtos/Session.dto";
import { GetScheduleValidation } from "./getSchedule.validation";

export type GetScheduleRouteConfig = GetScheduleValidation & { files: never };
export type GetScheduleResponse = { schedule: SessionDTO[]; holidays: unknown[] };
