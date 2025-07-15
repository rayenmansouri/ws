import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AssignTeacherToSubjectInClassController } from "./assignTeacherToSubjectInClass.controller";
import { AssignTeacherToSubjectInClassRouteConfig } from "./assignTeacherToSubjectInClass.types";
import { assignTeacherToSubjectInClassValidation } from "./assignTeacherToSubjectInClass.validation";

registerRoute<AssignTeacherToSubjectInClassRouteConfig>()({
  path: "/classes/:classNewId/subject/assign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: assignTeacherToSubjectInClassValidation.body,
  paramSchema: assignTeacherToSubjectInClassValidation.params,
  authorization: { action: ACTION_ENUM.ASSIGN, resource: RESOURCES_ENUM.TEACHER },
  controller: AssignTeacherToSubjectInClassController,
  isTransactionEnabled: false,
  platform: "web",
});
