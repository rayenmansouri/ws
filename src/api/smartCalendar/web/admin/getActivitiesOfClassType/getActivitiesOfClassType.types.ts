import { ActivityDTO } from "../../../../../feature/smartCalendar/dtos/Activity.dto";
import { GetActivitiesOfClassTypeValidation } from "./getActivitiesOfClassType.validation";

export type GetActivitiesOfClassTypeRouteConfig = GetActivitiesOfClassTypeValidation & {
  files: never;
};
export type GetActivitiesOfClassTypeResponse = ActivityDTO[];
