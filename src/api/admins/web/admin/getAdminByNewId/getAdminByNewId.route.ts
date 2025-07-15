import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAdminByNewIdController } from "./getAdminByNewId.controller";
import { GetAdminByNewIdRouteConfig } from "./getAdminByNewId.types";
import { getAdminByNewIdValidation } from "./getAdminByNewId.validation";

registerRoute<GetAdminByNewIdRouteConfig>()({
  path: "/admins/:adminNewId",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getAdminByNewIdValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ADMIN },
  controller: GetAdminByNewIdController,
  isTransactionEnabled: false,
  platform: "web",
});
