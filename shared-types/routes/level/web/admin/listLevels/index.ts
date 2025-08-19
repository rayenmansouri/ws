import { ListLevelsResponse } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
import { ListLevelsRouteConfig } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
import { ReplaceDatesWithStrings } from "../../../../../utils";
export const listLevelsRoute = {
    path: "/levels",
    method: "get",
    paramsKey: [],
};

export type ListLevelsRouteType = ReplaceDatesWithStrings<ListLevelsRouteConfig> & {
  response: ReplaceDatesWithStrings<ListLevelsResponse>
}
