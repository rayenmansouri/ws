import { LevelsOverviewResponse } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";
import { LevelsOverviewRouteConfig } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";
import { ReplaceDatesWithStrings } from "../../../../../utils";

export const levelsOverviewRoute = {
    path: "/levels/overview" as const,
    method: "get" as const,
    paramsKey: [],
};

export type LevelsOverviewRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<LevelsOverviewRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<LevelsOverviewRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<LevelsOverviewRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<LevelsOverviewRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<LevelsOverviewResponse>;
  };
}
