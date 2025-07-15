import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGroupListController } from "./getGroupList.controller";
import { GetGroupListRouteConfig } from "./getGroupList.types";
import { getGroupListValidation } from "./getGroupList.validation";

registerRoute<GetGroupListRouteConfig>()({
  path: "/groups/list",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getGroupListValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
  controller: GetGroupListController,
  isTransactionEnabled: false,
  platform: "web",
});
