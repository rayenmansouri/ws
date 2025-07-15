import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListRolesController } from "./listRoles.controller";
import { ListRolesRouteConfig } from "./listRoles.types";
import { listRolesValidation } from "./listRoles.validation";

registerRoute<ListRolesRouteConfig>()({
  path: "/roles",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  querySchema: listRolesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ROLE },
  controller: ListRolesController,
  isTransactionEnabled: false,
  platform: "web",
});
