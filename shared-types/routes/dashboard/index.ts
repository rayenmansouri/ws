import { GetDashboardResponse } from "../../../src/api-v2/dashboard/dashboard.types";
import { GetDashboardRouteConfig } from "../../../src/api-v2/dashboard/dashboard.types";
import { ReplaceDatesWithStrings } from "../../utils";

export const dashboardRoute = {
    path: "/dashboard",
    method: "get",
    paramsKey: [],
};

export type DashboardRouteType = ReplaceDatesWithStrings<GetDashboardRouteConfig> & {
  response: ReplaceDatesWithStrings<GetDashboardResponse>
}
