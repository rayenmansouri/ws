import { ReplaceDatesWithStrings } from "../../../../utils";
import { ForgetPasswordResponse } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";
import { ForgetPasswordRouteConfig } from "../../../../../src/api-v2/auth/public/forget-password/forget-password.types";

export const forgetPasswordRoute = {
    path: "/forget-password",
    method: "post",
    paramsKey: [],
};

export type ForgetPasswordRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
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
