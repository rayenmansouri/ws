import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddGroupController } from "./addGroup.controller";
import { AddGroupRouteConfig } from "./addGroup.types";
import { addGroupValidation } from "./addGroup.validation";

registerRoute<AddGroupRouteConfig>()({
  path: "/groups",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addGroupValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.GROUP },
  controller: AddGroupController,
  isTransactionEnabled: true,
  platform: "web",
});
