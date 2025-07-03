import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetClassOverviewController } from "./getClassOverview.controller";
import { GetClassOverviewRouteConfig } from "./getClassOverview.types";
import { getClassOverviewValidation } from "./getClassOverview.validation";

registerSharedRoute<GetClassOverviewRouteConfig>()(
  {
    path: "/classes/:classNewId/overview",
    method: "get",
    paramSchema: getClassOverviewValidation.params,
    controller: GetClassOverviewController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: {
        action: ACTION_ENUM.VIEW,
        resource: RESOURCES_ENUM.CLASS,
      },
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
