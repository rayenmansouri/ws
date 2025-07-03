import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAvailableClassroomInWeeklySessionController } from "./getAvailableClassroomInWeeklySession.controller";
import { GetAvailableClassroomInWeeklySessionRouteConfig } from "./getAvailableClassroomInWeeklySession.types";
import { getAvailableClassroomInWeeklySessionValidation } from "./getAvailableClassroomInWeeklySession.validation";

registerRoute<GetAvailableClassroomInWeeklySessionRouteConfig>()({
  path: "/weekly-sessions/classrooms/available",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAvailableClassroomInWeeklySessionValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASSROOM },
  controller: GetAvailableClassroomInWeeklySessionController,
  isTransactionEnabled: false,
  platform: "web",
});
