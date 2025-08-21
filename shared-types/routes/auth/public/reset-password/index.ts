import { ReplaceDatesWithStrings } from "../../../../utils";
import { ResetPasswordResponse } from "../../../../../src/api-v2/auth/public/reset-password/reset-password.types";
import { ResetPasswordRouteConfig } from "../../../../../src/api-v2/auth/public/reset-password/reset-password.types";

export const resetPasswordRoute = {
    path: "/reset-password",
    method: "post",
    paramsKey: [],
};

export type ResetPasswordRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body: ReplaceDatesWithStrings<ResetPasswordRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<ResetPasswordRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<ResetPasswordRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<ResetPasswordRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<ResetPasswordResponse>;
  };
}
