import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddRoleController } from "./addRole.controller";
import { AddRoleRouteConfig } from "./addRole.types";
import { addRoleValidation } from "./addRole.validation";

registerRoute<AddRoleRouteConfig>()({
  path: "/roles",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: addRoleValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ROLE },
  controller: AddRoleController,
  isTransactionEnabled: false,
  platform: "web",
});
