import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetClassListController } from "./getClassList.controller";
import { GetClassListRouteConfig } from "./getClassList.types";
import { getClassListValidation } from "./getClassList.validation";

registerRoute<GetClassListRouteConfig>()({
  path: "/sub-level/:subLevelNewId/class-list",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getClassListValidation.query,
  paramSchema: getClassListValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: GetClassListController,
  isTransactionEnabled: false,
  platform: "web",
});
