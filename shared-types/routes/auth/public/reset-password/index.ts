import { ResetPasswordResponse } from "../../../../../src/api-v2/auth/public/reset-password/reset-password.types";
import { ResetPasswordRouteConfig } from "../../../../../src/api-v2/auth/public/reset-password/reset-password.types";

export const resetPasswordRoute = {
    path: "/reset-password",
    method: "post",
    paramsKey: [],
};

export type ResetPasswordRouteType = ResetPasswordRouteConfig & {
  response: ResetPasswordResponse
}
