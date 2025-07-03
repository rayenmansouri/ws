import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteLevelController } from "./deleteLevel.controller";
import { DeleteLevelRouteConfig } from "./deleteLevel.types";
import { deleteLevelValidation } from "./deleteLevel.validation";

registerRoute<DeleteLevelRouteConfig>()({
  path: "/levels/:levelNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteLevelValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.LEVEL },
  controller: DeleteLevelController,
  isTransactionEnabled: true,
  platform: "web",
});
