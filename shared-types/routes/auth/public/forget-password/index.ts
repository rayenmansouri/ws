import { ForgetPasswordResponse } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";
import { ForgetPasswordRouteConfig } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";

export const forgetPasswordRoute = {
    path: "/forget-password",
    method: "post",
    paramsKey: [],
};

export type ForgetPasswordRouteType = ForgetPasswordRouteConfig & {
  response: ForgetPasswordResponse
}
