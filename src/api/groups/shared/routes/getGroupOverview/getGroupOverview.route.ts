import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetGroupOverviewController } from "./getGroupOverview.controller";
import { GetGroupOverviewRouteConfig } from "./getGroupOverview.types";
import { getGroupOverviewValidation } from "./getGroupOverview.validation";

registerSharedRoute<GetGroupOverviewRouteConfig>()(
  {
    path: "/groups/:groupNewId/overview",
    method: "get",
    paramSchema: getGroupOverviewValidation.params,
    controller: GetGroupOverviewController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
    },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web"] },
  ],
);
