import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGroupsOfTeacherController } from "./getGroupsOfTeacher.controller";
import { GetGroupsOfTeacherRouteConfig } from "./getGroupsOfTeacher.types";
import { getGroupsOfTeacherValidation } from "./getGroupsOfTeacher.validation";

registerRoute<GetGroupsOfTeacherRouteConfig>()({
  path: "/groups",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGroupsOfTeacherValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.GROUP },
  controller: GetGroupsOfTeacherController,
  isTransactionEnabled: false,
  platform: "mobile",
});
