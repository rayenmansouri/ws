import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListAdminsController } from "./listAdmins.controller";
import { ListAdminsRouteConfig } from "./listAdmins.types";
import { listAdminsValidation } from "./listAdmins.validation";

registerRoute<ListAdminsRouteConfig>()({
  path: "/admins",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listAdminsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ADMIN },
  controller: ListAdminsController,
  isTransactionEnabled: false,
  platform: "web",
});
