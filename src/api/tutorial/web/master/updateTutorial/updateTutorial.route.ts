import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTutorialController } from "./updateTutorial.controller";
import { UpdateTutorialRouteConfig } from "./updateTutorial.types";
import { updateTutorialValidation } from "./updateTutorial.validation";

registerRoute<UpdateTutorialRouteConfig>()({
  path: "/tutorials/:tutorialNewId",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateTutorialValidation.body,
  paramSchema: updateTutorialValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.TUTORIAL },
  controller: UpdateTutorialController,
  isTransactionEnabled: false,
  platform: "web",
});
