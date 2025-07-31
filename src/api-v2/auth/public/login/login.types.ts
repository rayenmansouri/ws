import { BaseUser } from "../../../../feature/user-management/base-user/domain/base-user.entity";
import { LoginValidation } from "./login.validation";

export type LoginRouteConfig = LoginValidation & { files: never };

export type LoginResponse = { token:string,user:BaseUser }