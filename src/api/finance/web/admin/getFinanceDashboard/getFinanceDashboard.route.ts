import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetFinanceDashboardController } from "./getFinanceDashboard.controller";
import { GetFinanceDashboardRouteConfig } from "./getFinanceDashboard.types";
import { getFinanceDashboardValidation } from "./getFinanceDashboard.validation";

registerRoute<GetFinanceDashboardRouteConfig>()({
  path: "/transaction/dashboard",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getFinanceDashboardValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.FINANCE_DASHBOARD },
  controller: GetFinanceDashboardController,
  isTransactionEnabled: false,
  platform: "web",
});
