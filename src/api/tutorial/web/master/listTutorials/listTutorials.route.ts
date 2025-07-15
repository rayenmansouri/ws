import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListTutorialsController } from "./listTutorials.controller";
import { ListTutorialsRouteConfig } from "./listTutorials.types";
import { listTutorialsValidation } from "./listTutorials.validation";

registerRoute<ListTutorialsRouteConfig>()({
  path: "/tutorials",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  querySchema: listTutorialsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TUTORIAL },
  controller: ListTutorialsController,
  isTransactionEnabled: false,
  platform: "web",
});
