import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ReorderLevelsController } from "./reorderLevels.controller";
import { ReorderLevelsRouteConfig } from "./reorderLevels.types";
import { reorderLevelsValidation } from "./reorderLevels.validation";

registerRoute<ReorderLevelsRouteConfig>()({
  path: "/levels/:levelNewId/reorder",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: reorderLevelsValidation.body,
  paramSchema: reorderLevelsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.LEVEL },
  controller: ReorderLevelsController,
  isTransactionEnabled: true,
  platform: "web",
});
