import { LoginResponse } from "../../../src/api-v2/auth/public/login/login.types";
import { LoginRouteConfig } from "../../../src/api-v2/auth/public/login/login.types";

export const loginRoute = {
    path: "/login",
    method: "post",
    paramsKey: [],
  };
 
export type LoginRouteType = LoginRouteConfig & {
  response: LoginResponse
}
