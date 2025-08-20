import { ReplaceDatesWithStrings } from "../../../../utils";
import { LogoutResponse } from "../../../../../src/api-v2/auth/public/logout/logout.types";
import { LogoutRouteConfig } from "../../../../../src/api-v2/auth/public/logout/logout.types";

export const logoutRoute = {
    path: "/logout",
    method: "post",
    paramsKey: [],
};

export type LogoutRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<LogoutRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<LogoutRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<LogoutRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<LogoutRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<LogoutResponse>;
  };
}
