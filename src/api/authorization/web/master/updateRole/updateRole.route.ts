import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateRoleController } from "./updateRole.controller";
import { UpdateRoleRouteConfig } from "./updateRole.types";
import { updateRoleValidation } from "./updateRole.validation";

registerRoute<UpdateRoleRouteConfig>()({
  path: "/roles/:roleNewId",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateRoleValidation.body,
  paramSchema: updateRoleValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ROLE },
  controller: UpdateRoleController,
  isTransactionEnabled: false,
  platform: "web",
});
