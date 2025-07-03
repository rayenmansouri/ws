import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddLevelController } from "./addLevel.controller";
import { AddLevelRouteConfig } from "./addLevel.types";
import { addLevelValidation } from "./addLevel.validation";

registerRoute<AddLevelRouteConfig>()({
  path: "/levels",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addLevelValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.LEVEL },
  controller: AddLevelController,
  isTransactionEnabled: true,
  platform: "web",
});
