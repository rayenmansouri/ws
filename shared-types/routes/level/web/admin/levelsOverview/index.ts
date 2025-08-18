import { LevelsOverviewResponse } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";
import { LevelsOverviewRouteConfig } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";

export const levelsOverviewRoute = {
    path: "/levels/overview",
    method: "get",
    paramsKey: [],
};

export type LevelsOverviewRouteType = LevelsOverviewRouteConfig & {
  response: LevelsOverviewResponse
}
