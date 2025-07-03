import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnAssignTeacherFromSubjectController } from "./unAssignTeacherFromSubject.controller";
import { UnAssignTeacherFromSubjectRouteConfig } from "./unAssignTeacherFromSubject.types";
import { unAssignTeacherFromSubjectValidation } from "./unAssignTeacherFromSubject.validation";

registerRoute<UnAssignTeacherFromSubjectRouteConfig>()({
  path: "/classes/:classNewId/subjects/:subjectTypeId/unassign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unAssignTeacherFromSubjectValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: UnAssignTeacherFromSubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
