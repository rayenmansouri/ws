import { CurrentUserDTO } from "../../../../../feature/users/dtos/CurrentUser.dto";
import { GetCurrentUserValidation } from "./getCurrentUser.validation";

export type GetCurrentUserRouteConfig = GetCurrentUserValidation & { files: never };
export type GetCurrentUserResponse = CurrentUserDTO;
