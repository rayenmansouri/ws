import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListLevelsController } from "./listLevels.controller";
import { ListLevelsRouteConfig } from "./listLevels.types";
import { listLevelsValidation } from "./listLevels.validation";

registerRoute<ListLevelsRouteConfig>()({
  path: "/levels",
  method: "get",
  endUser: undefined,
  isPublic: true,
  querySchema: listLevelsValidation.query,
  controller: ListLevelsController,
  isTransactionEnabled: false,
  platform: "web",
});
