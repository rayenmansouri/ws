import { LevelsOverviewResponse } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";
import { LevelsOverviewRouteConfig } from "../../../../../../src/api-v2/level/web/admin/levelsOverview/levelsOverview.types";
import { ReplaceDatesWithStrings } from "../../../../../utils";

export const levelsOverviewRoute = {
    path: "/levels/overview",
    method: "get",
    paramsKey: [],
};

export type LevelsOverviewRouteType = ReplaceDatesWithStrings<LevelsOverviewRouteConfig> & {
  response: ReplaceDatesWithStrings<LevelsOverviewResponse>
}
