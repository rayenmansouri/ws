import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteRoleController } from "./deleteRole.controller";
import { DeleteRoleRouteConfig } from "./deleteRole.types";
import { deleteRoleValidation } from "./deleteRole.validation";

registerRoute<DeleteRoleRouteConfig>()({
  path: "/roles/:roleNewId",
  method: "delete",
  endUser: END_USER_ENUM.MASTER,
  paramSchema: deleteRoleValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.ROLE },
  controller: DeleteRoleController,
  isTransactionEnabled: true,
  platform: "web",
});
