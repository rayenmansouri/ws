import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ArchiveAdminController } from "./archiveAdmin.controller";
import { ArchiveAdminRouteConfig } from "./archiveAdmin.types";
import { archiveAdminValidation } from "./archiveAdmin.validation";

registerRoute<ArchiveAdminRouteConfig>()({
  path: "/admins/:adminNewId/archive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: archiveAdminValidation.params,
  authorization: { action: ACTION_ENUM.ARCHIVE, resource: RESOURCES_ENUM.ADMIN },
  controller: ArchiveAdminController,
  isTransactionEnabled: false,
  platform: "web",
});
