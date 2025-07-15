import { EntityScheduleDto } from "../../../../../feature/schedules/dtos/entitySchedule.dto";
import { GetEntityScheduleValidation } from "./getEntitySchedule.validation";

export type GetEntityScheduleRouteConfig = GetEntityScheduleValidation & { files: never };
export type GetEntityScheduleResponse = EntityScheduleDto[];
