import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetLevelsOverviewController } from "./getLevelsOverview.controller";
import { GetLevelsOverviewRouteConfig } from "./getLevelsOverview.types";

registerRoute<GetLevelsOverviewRouteConfig>()({
  path: "/levels/overview",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LEVEL },
  controller: GetLevelsOverviewController,
  isTransactionEnabled: false,
  platform: "web",
});
