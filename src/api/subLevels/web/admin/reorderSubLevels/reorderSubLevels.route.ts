import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderSubLevelsController } from "./reorderSubLevels.controller";
import { ReorderSubLevelsRouteConfig } from "./reorderSubLevels.types";
import { reorderSubLevelsValidation } from "./reorderSubLevels.validation";

registerRoute<ReorderSubLevelsRouteConfig>()({
  path: "/sub-levels/:subLevelNewId/reorder",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: reorderSubLevelsValidation.body,
  paramSchema: reorderSubLevelsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SUB_LEVEL },
  controller: ReorderSubLevelsController,
  isTransactionEnabled: false,
  platform: "web",
});
