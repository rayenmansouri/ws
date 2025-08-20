import { ReplaceDatesWithStrings } from "../../../../utils";
import { UpdateCurrentUserPasswordResponse } from "../../../../../src/api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.types";
import { UpdateCurrentUserPasswordRouteConfig } from "../../../../../src/api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.types";

export const updateCurrentUserPasswordRoute = {
    path: "/password",
    method: "patch",
    paramsKey: [],
};

export type UpdateCurrentUserPasswordRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<UpdateCurrentUserPasswordRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<UpdateCurrentUserPasswordRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<UpdateCurrentUserPasswordRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<UpdateCurrentUserPasswordRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<UpdateCurrentUserPasswordResponse>;
  };
}
