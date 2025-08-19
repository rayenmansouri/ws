import { LoginResponse } from "../../../src/api-v2/auth/public/login/login.types";
import { LoginRouteConfig } from "../../../src/api-v2/auth/public/login/login.types";
import { ReplaceDatesWithStrings } from "../../utils";

export const loginRoute = {
    path: "/login",
    method: "post",
    paramsKey: [],
  };
 
export type LoginRouteType = ReplaceDatesWithStrings<LoginRouteConfig> & {
  response: ReplaceDatesWithStrings<LoginResponse>
}
