import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnArchiveTeacherController } from "./unArchiveTeacher.controller";
import { UnArchiveTeacherRouteConfig } from "./unArchiveTeacher.types";
import { unArchiveTeacherValidation } from "./unArchiveTeacher.validation";

registerRoute<UnArchiveTeacherRouteConfig>()({
  path: "/teachers/:teacherNewId/unarchive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unArchiveTeacherValidation.params,
  authorization: { action: ACTION_ENUM.UNARCHIVE, resource: RESOURCES_ENUM.TEACHER },
  controller: UnArchiveTeacherController,
  isTransactionEnabled: false,
  platform: "web",
});
