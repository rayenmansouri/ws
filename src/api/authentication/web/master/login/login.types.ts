import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { LoginValidation } from "./login.validation";

export type LoginRouteConfig = LoginValidation & { files: never };
export type LoginResponse = {
  token: string;
  user: UserProfileDTO;
};
