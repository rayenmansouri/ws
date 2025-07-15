import { ID } from "../../../../../types/BaseEntity";
import { UpdateWeeklySessionForClassValidation } from "./updateWeeklySessionForClass.validation";

export type UpdateWeeklySessionForClassRouteConfig = UpdateWeeklySessionForClassValidation & {
  files: never;
};
export type UpdateWeeklySessionForClassResponse = {
  isValid: boolean;
  weeklySessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    classGroup: string | null;
    group: string | null;
  };
};
