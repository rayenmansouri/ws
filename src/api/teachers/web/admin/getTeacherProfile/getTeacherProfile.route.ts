import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTeacherProfileController } from "./getTeacherProfile.controller";
import { GetTeacherProfileRouteConfig } from "./getTeacherProfile.types";
import { getTeacherProfileValidation } from "./getTeacherProfile.validation";

registerRoute<GetTeacherProfileRouteConfig>()({
  path: "/teachers/:teacherNewId/profile",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getTeacherProfileValidation.params,
  querySchema: getTeacherProfileValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TEACHER },
  controller: GetTeacherProfileController,
  isTransactionEnabled: false,
  platform: "web",
});
