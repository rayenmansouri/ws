import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetOneRoleController } from "./getOneRole.controller";
import { GetOneRoleRouteConfig } from "./getOneRole.types";
import { getOneRoleValidation } from "./getOneRole.validation";

registerRoute<GetOneRoleRouteConfig>()({
  path: "/roles/:roleNewId",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  paramSchema: getOneRoleValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ROLE },
  controller: GetOneRoleController,
  isTransactionEnabled: false,
  platform: "web",
});
