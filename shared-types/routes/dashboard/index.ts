import { GetDashboardResponse } from "../../../src/api-v2/dashboard/dashboard.types";
import { GetDashboardRouteConfig } from "../../../src/api-v2/dashboard/dashboard.types";
import { ReplaceDatesWithStrings } from "../../utils";

export const dashboardRoute = {
    path: "/dashboard",
    method: "get",
    paramsKey: [],
};

export type DashboardRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<GetDashboardRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<GetDashboardRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<GetDashboardRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<GetDashboardRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<GetDashboardResponse>;
  };
}
