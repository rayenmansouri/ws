import { ID } from "../../../../../types/BaseEntity";
import { AddWeeklySessionForClassValidation } from "./addWeeklySessionForClass.validation";

export type AddWeeklySessionForClassRouteConfig = AddWeeklySessionForClassValidation & {
  files: never;
};
export type AddWeeklySessionForClassResponse = {
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
