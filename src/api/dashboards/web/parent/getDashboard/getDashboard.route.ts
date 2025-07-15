import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetDashboardController } from "./getDashboard.controller";
import { GetDashboardRouteConfig } from "./getDashboard.types";
import { getDashboardValidation } from "./getDashboard.validation";

registerRoute<GetDashboardRouteConfig>()({
  path: "/dashboard",
  method: "get",
  endUser: END_USER_ENUM.PARENT,
  querySchema: getDashboardValidation.query,
  controller: GetDashboardController,
  isTransactionEnabled: false,
  platform: "web",
});
