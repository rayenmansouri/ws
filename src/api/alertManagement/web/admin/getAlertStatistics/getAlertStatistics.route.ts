import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAlertStatisticsController } from "./getAlertStatistics.controller";
import { GetAlertStatisticsRouteConfig } from "./getAlertStatistics.types";

registerRoute<GetAlertStatisticsRouteConfig>()({
  path: "/alerts/statistics",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ALERT },
  controller: GetAlertStatisticsController,
  isTransactionEnabled: false,
  platform: "web",
});
