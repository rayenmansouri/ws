import { ReplaceDatesWithStrings } from "../../../utils";
import { getConfigResponse } from "../../../../src/api-v2/organization-api/config/config-route.type";
import { getConfigRouteType } from "../../../../src/api-v2/organization-api/config/config-route.type";

export const configRoute = {
    path: "/organizations/:organizationId/config" as const,
    method: "get" as const,
    paramsKey: ["organizationId"] as const,
};

export type ConfigRouteType = {
  path: "/organizations/:organizationId/config";
  method: "get";
  paramsKey: readonly string[];
  body?: ReplaceDatesWithStrings<getConfigRouteType['body']>;
  params?: ReplaceDatesWithStrings<getConfigRouteType['params']>;
  query?: ReplaceDatesWithStrings<getConfigRouteType['query']>;
  files?: ReplaceDatesWithStrings<getConfigRouteType['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<getConfigResponse>;
  };
}
