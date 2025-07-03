import { ID } from "../../../../../types/BaseEntity";
import { UpdateWeeklySessionForGroupValidation } from "./updateWeeklySessionForGroup.validation";

export type UpdateWeeklySessionForGroupRouteConfig = UpdateWeeklySessionForGroupValidation & {
  files: never;
};
export type UpdateWeeklySessionForGroupResponse = {
  isValid: boolean;
  weeklySessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
