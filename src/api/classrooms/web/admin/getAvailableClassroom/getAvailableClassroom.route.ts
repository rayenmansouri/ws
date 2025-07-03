import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAvailableClassroomController } from "./getAvailableClassroom.controller";
import { GetAvailableClassroomRouteConfig } from "./getAvailableClassroom.types";
import { getAvailableClassroomValidation } from "./getAvailableClassroom.validation";

registerRoute<GetAvailableClassroomRouteConfig>()({
  path: "/classrooms/available",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getAvailableClassroomValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASSROOM },
  controller: GetAvailableClassroomController,
  isTransactionEnabled: false,
  platform: "web",
});
