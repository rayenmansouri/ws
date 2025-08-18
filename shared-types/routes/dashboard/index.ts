import { GetDashboardResponse } from "../../../src/api-v2/dashboard/dashboard.types";
import { GetDashboardRouteConfig } from "../../../src/api-v2/dashboard/dashboard.types";

export const dashboardRoute = {
    path: "/dashboard",
    method: "get",
    paramsKey: [],
};

export type DashboardRouteType = GetDashboardRouteConfig & {
  response: GetDashboardResponse
}
