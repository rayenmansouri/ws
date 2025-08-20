import { LoginResponse } from "../../../src/api-v2/auth/public/login/login.types";
import { LoginRouteConfig } from "../../../src/api-v2/auth/public/login/login.types";
import { ReplaceDatesWithStrings } from "../../utils";

export const loginRoute = {
    path: "/login",
    method: "post",
    paramsKey: [],
  };
 
export type LoginRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<LoginRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<LoginRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<LoginRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<LoginRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<LoginResponse>;
  };
}


export type RouteType = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
  files?: unknown;
  response: {
    status: string;
    message: string;
    data: unknown;
  };
};

