import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGroupsOfClassController } from "./getGroupsOfClass.controller";
import { GetGroupsOfClassRouteConfig } from "./getGroupsOfClass.types";
import { getGroupsOfClassValidation } from "./getGroupsOfClass.validation";

registerRoute<GetGroupsOfClassRouteConfig>()({
  path: "/classes/:classNewId/groups",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getGroupsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: GetGroupsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
