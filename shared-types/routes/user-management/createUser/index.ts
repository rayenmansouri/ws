import { CreateUserResponse } from "../../../../src/api-v2/user-management/createUser.types";
import { CreateUserRouteConfig } from "../../../../src/api-v2/user-management/createUser.types";

export const createUserRoute = {
    path: "/users",
    method: "post",
    paramsKey: [],
};

export type CreateUserRouteType = CreateUserRouteConfig & {
  response: CreateUserResponse
}
