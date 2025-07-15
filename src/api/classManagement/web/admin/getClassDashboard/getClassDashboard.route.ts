import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetClassDashboardController } from "./getClassDashboard.controller";
import { GetClassDashboardRouteConfig } from "./getClassDashboard.types";
import { getClassDashboardValidation } from "./getClassDashboard.validation";

registerRoute<GetClassDashboardRouteConfig>()({
  path: "/class/:classNewId/dashboard",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getClassDashboardValidation.query,
  paramSchema: getClassDashboardValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: GetClassDashboardController,
  isTransactionEnabled: false,
  platform: "web",
});
