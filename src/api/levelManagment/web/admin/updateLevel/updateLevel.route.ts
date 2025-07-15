import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateLevelController } from "./updateLevel.controller";
import { UpdateLevelRouteConfig } from "./updateLevel.types";
import { updateLevelValidation } from "./updateLevel.validation";

registerRoute<UpdateLevelRouteConfig>()({
  path: "/levels/:levelNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateLevelValidation.body,
  paramSchema: updateLevelValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.LEVEL },
  controller: UpdateLevelController,
  isTransactionEnabled: false,
  platform: "web",
});
