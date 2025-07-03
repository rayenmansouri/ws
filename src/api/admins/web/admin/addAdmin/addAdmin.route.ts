import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddAdminController } from "./addAdmin.controller";
import { AddAdminRouteConfig } from "./addAdmin.types";
import { addAdminValidation } from "./addAdmin.validation";

registerRoute<AddAdminRouteConfig>()({
  path: "/admin",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addAdminValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ADMIN },
  controller: AddAdminController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [
      {
        name: "avatar",
        maxCount: 1,
      },
    ],
  },
});
