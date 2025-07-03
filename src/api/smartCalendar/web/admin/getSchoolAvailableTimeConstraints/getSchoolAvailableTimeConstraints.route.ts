import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSchoolAvailableTimeConstraintsController } from "./getSchoolAvailableTimeConstraints.controller";
import { GetSchoolAvailableTimeConstraintsRouteConfig } from "./getSchoolAvailableTimeConstraints.types";

registerRoute<GetSchoolAvailableTimeConstraintsRouteConfig>()({
  path: "/school/available-time-constraints",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: GetSchoolAvailableTimeConstraintsController,
  isTransactionEnabled: false,
  platform: "web",
});
