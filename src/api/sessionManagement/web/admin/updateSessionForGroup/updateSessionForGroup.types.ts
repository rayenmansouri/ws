import { ID } from "../../../../../types/BaseEntity";
import { UpdateSessionForGroupValidation } from "./updateSessionForGroup.validation";

export type UpdateSessionForGroupRouteConfig = UpdateSessionForGroupValidation & { files: never };
export type UpdateSessionForGroupResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};
