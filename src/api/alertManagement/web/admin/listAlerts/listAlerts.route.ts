import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListAlertController } from "./listAlerts.controller";
import { ListAlertsRouteConfig } from "./listAlerts.types";
import { listAlertsValidation } from "./listAlerts.validation";

registerRoute<ListAlertsRouteConfig>()({
  path: "/alerts",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listAlertsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ALERT },
  controller: ListAlertController,
  isTransactionEnabled: false,
  platform: "web",
});
