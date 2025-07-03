import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListLevelsController } from "./listLevels.controller";
import { ListLevelsRouteConfig } from "./listLevels.types";
import { listLevelsValidation } from "./listLevels.validation";

registerRoute<ListLevelsRouteConfig>()({
  path: "/levels",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listLevelsValidation.query,
  controller: ListLevelsController,
  isTransactionEnabled: false,
  platform: "web",
});
