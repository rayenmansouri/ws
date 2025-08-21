import { ReplaceDatesWithStrings } from "../../../../utils";
import { ForgetPasswordResponse } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";
import { ForgetPasswordRouteConfig } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";

export const forgetPasswordRoute = {
    path: "/forget-password" as const,
    method: "post" as const,
    paramsKey: [],
};

export type ForgetPasswordRouteType = {
  path: "/forget-password";
  method: "post";
  paramsKey: readonly string[];
  body?: ReplaceDatesWithStrings<ForgetPasswordRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<ForgetPasswordRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<ForgetPasswordRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<ForgetPasswordRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<ForgetPasswordResponse>;
  };
}
