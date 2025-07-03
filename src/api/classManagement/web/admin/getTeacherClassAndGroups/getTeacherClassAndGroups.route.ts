import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTeacherClassAndGroupsController } from "./getTeacherClassAndGroups.controller";
import { GetTeacherClassAndGroupsRouteConfig } from "./getTeacherClassAndGroups.types";
import { getTeacherClassAndGroupsValidation } from "./getTeacherClassAndGroups.validation";

registerRoute<GetTeacherClassAndGroupsRouteConfig>()({
  path: "/teachers/:teacherNewId/classes",
  method: "get",
  querySchema: getTeacherClassAndGroupsValidation.query,
  paramSchema: getTeacherClassAndGroupsValidation.params,
  controller: GetTeacherClassAndGroupsController,
  isTransactionEnabled: false,
  endUser: END_USER_ENUM.ADMIN,
  platform: "web",
});
