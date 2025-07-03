import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListGroupsController } from "./listGroups.controller";
import { ListGroupsRouteConfig } from "./listGroups.types";
import { listGroupsValidation } from "./listGroups.validation";

registerRoute<ListGroupsRouteConfig>()({
  path: "/groups",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listGroupsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
  controller: ListGroupsController,
  isTransactionEnabled: false,
  platform: "web",
});
