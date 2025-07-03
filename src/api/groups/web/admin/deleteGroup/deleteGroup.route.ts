import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteGroupController } from "./deleteGroup.controller";
import { DeleteGroupRouteConfig } from "./deleteGroup.types";
import { deleteGroupValidation } from "./deleteGroup.validation";

registerRoute<DeleteGroupRouteConfig>()({
  path: "/groups/:groupNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteGroupValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.GROUP },
  controller: DeleteGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
