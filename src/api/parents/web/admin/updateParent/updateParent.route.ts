import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateParentController } from "./updateParent.controller";
import { UpdateParentRouteConfig } from "./updateParent.types";
import { updateParentValidation } from "./updateParent.validation";

registerRoute<UpdateParentRouteConfig>()({
  path: "/parents/:parentNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateParentValidation.body,
  paramSchema: updateParentValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PARENT },
  controller: UpdateParentController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [{ name: "avatar", maxCount: 1 }],
  },
});
