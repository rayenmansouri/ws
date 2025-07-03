import { AddSessionForGroupValidation } from "./addSessionForGroup.validation";

export type AddSessionForGroupRouteConfig = AddSessionForGroupValidation & { files: never };
export type AddSessionForGroupResponse = {
  isValid: boolean;
  sessionId: string | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
