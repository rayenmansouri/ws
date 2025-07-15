import { ListSubLevelsController } from "./listSubLevels.controller";
import { ListSubLevelsRouteConfig } from "./listSubLevels.types";
import { listSubLevelsValidation } from "./listSubLevels.validation";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";

registerRoute<ListSubLevelsRouteConfig>()({
  path: "/sub-levels",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSubLevelsValidation.query,
  controller: ListSubLevelsController,
  isTransactionEnabled: false,
  platform: "web",
});
