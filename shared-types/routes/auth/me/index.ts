import { ReplaceDatesWithStrings } from "../../../utils";
import { MeResponse } from "../../../../src/api-v2/auth/me/me.types";
import { MeRouteConfig } from "../../../../src/api-v2/auth/me/me.types";

export const meRoute = {
    path: "/me",
    method: "get",
    paramsKey: [],
};

export type MeRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<MeRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<MeRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<MeRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<MeRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<MeResponse>;
  };
}
