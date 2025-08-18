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


export type CreateUserRouteType = CreateUserRouteConfig & {
  response: CreateUserResponse
}
