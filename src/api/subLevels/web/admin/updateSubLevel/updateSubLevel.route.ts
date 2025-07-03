import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSubLevelController } from "./updateSubLevel.controller";
import { UpdateSubLevelRouteConfig } from "./updateSubLevel.types";
import { updateSubLevelValidation } from "./updateSubLevel.validation";

registerRoute<UpdateSubLevelRouteConfig>()({
  path: "/subLevels/:subLevelNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSubLevelValidation.body,
  paramSchema: updateSubLevelValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SUB_LEVEL },
  controller: UpdateSubLevelController,
  isTransactionEnabled: true,
  platform: "web",
});
