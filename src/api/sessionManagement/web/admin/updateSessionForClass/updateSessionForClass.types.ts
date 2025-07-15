import { ID } from "../../../../../types/BaseEntity";
import { UpdateSessionForClassValidation } from "./updateSessionForClass.validation";

export type UpdateSessionForClassRouteConfig = UpdateSessionForClassValidation & { files: never };
export type UpdateSessionForClassResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
