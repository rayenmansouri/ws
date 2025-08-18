import { ListLevelsResponse } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
import { ListLevelsRouteConfig } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
export const listLevelsRoute = {
    path: "/levels",
    method: "get",
    paramsKey: [],
};

export type ListLevelsRouteType = ListLevelsRouteConfig & {
  response: ListLevelsResponse
}
