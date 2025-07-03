import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ArchiveTeacherController } from "./archiveTeacher.controller";
import { ArchiveTeacherRouteConfig } from "./archiveTeacher.types";
import { archiveTeacherValidation } from "./archiveTeacher.validation";

registerRoute<ArchiveTeacherRouteConfig>()({
  path: "/teachers/:teacherNewId/archive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: archiveTeacherValidation.params,
  authorization: { action: ACTION_ENUM.ARCHIVE, resource: RESOURCES_ENUM.TEACHER },
  controller: ArchiveTeacherController,
  isTransactionEnabled: false,
  platform: "web",
});
