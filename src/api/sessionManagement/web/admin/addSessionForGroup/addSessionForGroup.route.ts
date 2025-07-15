import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSessionForGroupController } from "./addSessionForGroup.controller";
import { AddSessionForGroupRouteConfig } from "./addSessionForGroup.types";
import { addSessionForGroupValidation } from "./addSessionForGroup.validation";

registerRoute<AddSessionForGroupRouteConfig>()({
  path: "/groups/sessions",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSessionForGroupValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION },
  controller: AddSessionForGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
