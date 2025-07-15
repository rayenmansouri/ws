import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSubLevelController } from "./addSubLevel.controller";
import { AddSubLevelRouteConfig } from "./addSubLevel.types";
import { addSubLevelValidation } from "./addSubLevel.validation";

registerRoute<AddSubLevelRouteConfig>()({
  path: "/subLevel",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSubLevelValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SUB_LEVEL },
  controller: AddSubLevelController,
  isTransactionEnabled: false,
  platform: "web",
});
