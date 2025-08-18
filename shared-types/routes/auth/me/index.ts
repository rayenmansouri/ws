import { MeResponse } from "../../../../src/api-v2/auth/me/me.types";
import { MeRouteConfig } from "../../../../src/api-v2/auth/me/me.types";

export const meRoute = {
    path: "/me",
    method: "get",
    paramsKey: [],
};

export type MeRouteType = MeRouteConfig & {
  response: MeResponse
}
