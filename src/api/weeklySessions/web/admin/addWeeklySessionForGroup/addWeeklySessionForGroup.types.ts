import { ID } from "../../../../../types/BaseEntity";
import { AddWeeklySessionForGroupValidation } from "./addWeeklySessionForGroup.validation";

export type AddWeeklySessionForGroupRouteConfig = AddWeeklySessionForGroupValidation & {
  files: never;
};
export type AddWeeklySessionForGroupResponse = {
  isValid: boolean;
  weeklySessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
