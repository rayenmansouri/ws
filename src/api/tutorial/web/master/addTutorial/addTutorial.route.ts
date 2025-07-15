import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTutorialController } from "./addTutorial.controller";
import { AddTutorialRouteConfig } from "./addTutorial.types";
import { addTutorialValidation } from "./addTutorial.validation";

registerRoute<AddTutorialRouteConfig>()({
  path: "/tutorial",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: addTutorialValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.TUTORIAL },
  controller: AddTutorialController,
  isTransactionEnabled: false,
  platform: "web",
});
