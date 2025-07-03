import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTopicOfGroupController } from "./getTopicOfGroup.controller";
import { GetTopicOfGroupRouteConfig } from "./getTopicOfGroup.types";
import { getTopicOfGroupValidation } from "./getTopicOfGroup.validation";

registerRoute<GetTopicOfGroupRouteConfig>()({
  path: "/groups/:groupNewId/topics",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getTopicOfGroupValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
  controller: GetTopicOfGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
