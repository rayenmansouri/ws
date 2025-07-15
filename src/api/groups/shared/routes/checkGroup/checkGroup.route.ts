import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { CheckGroupController } from "./checkGroup.controller";
import { CheckGroupRouteConfig } from "./checkGroup.types";
import { checkGroupValidation } from "./checkGroup.validation";

registerSharedRoute<CheckGroupRouteConfig>()(
  {
    path: "/groups/:groupNewId/isExist",
    method: "get",
    paramSchema: checkGroupValidation.params,
    controller: CheckGroupController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
      platforms: ["web"],
    },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
  ],
);
