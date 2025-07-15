import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ArchiveStudentController } from "./archiveStudent.controller";
import { ArchiveStudentRouteConfig } from "./archiveStudent.types";
import { archiveStudentValidation } from "./archiveStudent.validation";

registerRoute<ArchiveStudentRouteConfig>()({
  path: "/students/:studentNewId/archive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: archiveStudentValidation.params,
  authorization: { action: ACTION_ENUM.ARCHIVE, resource: RESOURCES_ENUM.STUDENT },
  controller: ArchiveStudentController,
  isTransactionEnabled: true,
  platform: "web",
});
