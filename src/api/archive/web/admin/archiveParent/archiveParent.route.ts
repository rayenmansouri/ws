import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ArchiveParentController } from "./archiveParent.controller";
import { ArchiveParentRouteConfig } from "./archiveParent.types";
import { archiveParentValidation } from "./archiveParent.validation";

registerRoute<ArchiveParentRouteConfig>()({
  path: "/parents/:parentNewId/archive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: archiveParentValidation.params,
  authorization: { action: ACTION_ENUM.ARCHIVE, resource: RESOURCES_ENUM.PARENT },
  controller: ArchiveParentController,
  isTransactionEnabled: true,
  platform: "web",
});
