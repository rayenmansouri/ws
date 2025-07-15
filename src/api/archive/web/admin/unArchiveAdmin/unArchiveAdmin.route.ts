import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnArchiveAdminController } from "./unArchiveAdmin.controller";
import { UnArchiveAdminRouteConfig } from "./unArchiveAdmin.types";
import { unArchiveAdminValidation } from "./unArchiveAdmin.validation";

registerRoute<UnArchiveAdminRouteConfig>()({
  path: "/admins/:adminNewId/unarchive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unArchiveAdminValidation.params,
  authorization: { action: ACTION_ENUM.UNARCHIVE, resource: RESOURCES_ENUM.ADMIN },
  controller: UnArchiveAdminController,
  isTransactionEnabled: false,
  platform: "web",
});
