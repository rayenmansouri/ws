import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteTutorialController } from "./deleteTutorial.controller";
import { DeleteTutorialRouteConfig } from "./deleteTutorial.types";
import { deleteTutorialValidation } from "./deleteTutorial.validation";

registerRoute<DeleteTutorialRouteConfig>()({
  path: "/tutorials/:tutorialNewId",
  method: "delete",
  endUser: END_USER_ENUM.MASTER,
  paramSchema: deleteTutorialValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.TUTORIAL },
  controller: DeleteTutorialController,
  isTransactionEnabled: false,
  platform: "web",
});
