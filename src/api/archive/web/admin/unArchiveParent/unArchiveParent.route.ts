import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnArchiveParentController } from "./unArchiveParent.controller";
import { UnArchiveParentRouteConfig } from "./unArchiveParent.types";
import { unArchiveParentValidation } from "./unArchiveParent.validation";

registerRoute<UnArchiveParentRouteConfig>()({
  path: "/parents/:parentNewId/unarchive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unArchiveParentValidation.params,
  authorization: { action: ACTION_ENUM.UNARCHIVE, resource: RESOURCES_ENUM.PARENT },
  controller: UnArchiveParentController,
  isTransactionEnabled: false,
  platform: "web",
});
