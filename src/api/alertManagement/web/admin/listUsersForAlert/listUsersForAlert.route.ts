import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListUsersForAlertController } from "./listUsersForAlert.controller";
import { ListUsersForAlertRouteConfig } from "./listUsersForAlert.types";
import { listUsersForAlertValidation } from "./listUsersForAlert.validation";

registerRoute<ListUsersForAlertRouteConfig>()({
  path: "/alerts/list-users",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listUsersForAlertValidation.query,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ALERT },
  controller: ListUsersForAlertController,
  isTransactionEnabled: false,
  platform: "web",
});
