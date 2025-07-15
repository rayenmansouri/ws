import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateGroupController } from "./updateGroup.controller";
import { UpdateGroupRouteConfig } from "./updateGroup.types";
import { updateGroupValidation } from "./updateGroup.validation";

registerRoute<UpdateGroupRouteConfig>()({
  path: "/groups/:groupNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateGroupValidation.body,
  paramSchema: updateGroupValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.GROUP },
  controller: UpdateGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
