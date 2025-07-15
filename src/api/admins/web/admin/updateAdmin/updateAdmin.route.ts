import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateAdminController } from "./updateAdmin.controller";
import { UpdateAdminRouteConfig } from "./updateAdmin.types";
import { updateAdminValidation } from "./updateAdmin.validation";

registerRoute<UpdateAdminRouteConfig>()({
  path: "/admins/:adminNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateAdminValidation.body,
  paramSchema: updateAdminValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.ADMIN },
  controller: UpdateAdminController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [{ name: "avatar", maxCount: 1 }],
  },
});
