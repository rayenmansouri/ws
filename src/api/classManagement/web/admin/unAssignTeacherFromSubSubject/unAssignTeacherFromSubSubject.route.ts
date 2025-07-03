import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnAssignTeacherFromSubSubjectController } from "./unAssignTeacherFromSubSubject.controller";
import { UnAssignTeacherFromSubSubjectRouteConfig } from "./unAssignTeacherFromSubSubject.types";
import { unAssignTeacherFromSubSubjectValidation } from "./unAssignTeacherFromSubSubject.validation";

registerRoute<UnAssignTeacherFromSubSubjectRouteConfig>()({
  path: "/classes/:classNewId/sub-subjects/:subSubjectTypeId/unassign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unAssignTeacherFromSubSubjectValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: UnAssignTeacherFromSubSubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
