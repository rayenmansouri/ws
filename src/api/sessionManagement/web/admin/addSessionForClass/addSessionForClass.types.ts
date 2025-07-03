import { ID } from "../../../../../types/BaseEntity";
import { AddSessionForClassValidation } from "./addSessionForClass.validation";

export type AddSessionForClassRouteConfig = AddSessionForClassValidation & { files: never };
export type AddSessionForClassResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
