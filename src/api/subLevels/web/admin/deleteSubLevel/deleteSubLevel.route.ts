import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSubLevelController } from "./deleteSubLevel.controller";
import { DeleteSubLevelRouteConfig } from "./deleteSubLevel.types";
import { deleteSubLevelValidation } from "./deleteSubLevel.validation";

registerRoute<DeleteSubLevelRouteConfig>()({
  path: "/subLevels/:subLevelNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSubLevelValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SUB_LEVEL },
  controller: DeleteSubLevelController,
  isTransactionEnabled: false,
  platform: "web",
});
