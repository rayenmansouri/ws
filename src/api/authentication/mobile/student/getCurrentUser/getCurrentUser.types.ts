import { SessionDTO } from "../../../../../feature/sessionManagement/dtos/Session.dto";
import { CurrentUserDTO } from "../../../../../feature/users/dtos/CurrentUser.dto";
import { GetCurrentUserValidation } from "./getCurrentUser.validation";

export type GetCurrentUserRouteConfig = GetCurrentUserValidation & { files: never };
export type GetCurrentUserResponse = CurrentUserDTO & { nextSession: SessionDTO | null };
