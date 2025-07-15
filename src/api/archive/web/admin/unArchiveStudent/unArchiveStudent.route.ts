import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnArchiveStudentController } from "./unArchiveStudent.controller";
import { UnArchiveStudentRouteConfig } from "./unArchiveStudent.types";
import { unArchiveStudentValidation } from "./unArchiveStudent.validation";

registerRoute<UnArchiveStudentRouteConfig>()({
  path: "/students/:studentNewId/unarchive",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unArchiveStudentValidation.params,
  authorization: { action: ACTION_ENUM.UNARCHIVE, resource: RESOURCES_ENUM.STUDENT },
  controller: UnArchiveStudentController,
  isTransactionEnabled: false,
  platform: "web",
});
