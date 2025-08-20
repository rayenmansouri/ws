import { ReplaceDatesWithStrings } from "../../../utils";
import { CreateUserResponse } from "../../../../src/api-v2/user-management/createUser.types";
import { CreateUserRouteConfig } from "../../../../src/api-v2/user-management/createUser.types";

export const createParticipantRouteObject = {
    path: "/users/participants",
    method: "post",
    paramsKey: [],
};

export const createAdminRouteObject = {
    path: "/users/admins",
    method: "post",
    paramsKey: [],
};


export const createCoachRouteObject = {
    path: "/users/coaches",
    method: "post",
    paramsKey: [],
};


export type CreateUserRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<CreateUserRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<CreateUserRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<CreateUserRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<CreateUserRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<CreateUserResponse>;
  };
}
