import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddParentController } from "./addParent.controller";
import { AddParentRouteConfig } from "./addParent.types";
import { addParentValidation } from "./addParent.validation";

registerRoute<AddParentRouteConfig>()({
  path: "/parent",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addParentValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.PARENT },
  controller: AddParentController,
  isTransactionEnabled: true,
  upload: { fields: [{ name: "avatar", maxCount: 1 }] },
  platform: "web",
});
