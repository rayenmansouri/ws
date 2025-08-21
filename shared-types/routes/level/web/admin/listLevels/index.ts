import { ListLevelsResponse } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
import { ListLevelsRouteConfig } from "../../../../../../src/api-v2/level/web/admin/listLevels/listLevels.types";
import { ReplaceDatesWithStrings } from "../../../../../utils";
export const listLevelsRoute = {
    path: "/levels" as const,
    method: "get" as const,
    paramsKey: [],
};

export type ListLevelsRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<ListLevelsRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<ListLevelsRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<ListLevelsRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<ListLevelsRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<ListLevelsResponse>;
  };
}
