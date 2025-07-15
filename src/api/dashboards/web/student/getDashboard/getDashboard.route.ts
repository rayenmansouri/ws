import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetDashboardController } from "./getDashboard.controller";
import { GetDashboardRouteConfig } from "./getDashboard.types";

registerRoute<GetDashboardRouteConfig>()({
  path: "/dashboard",
  method: "get",
  endUser: END_USER_ENUM.STUDENT,
  controller: GetDashboardController,
  isTransactionEnabled: false,
  platform: "web",
});
