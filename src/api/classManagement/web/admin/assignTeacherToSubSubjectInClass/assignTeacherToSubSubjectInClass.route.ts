import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AssignTeacherToSubSubjectInClassController } from "./assignTeacherToSubSubjectInClass.controller";
import { AssignTeacherToSubSubjectInClassRouteConfig } from "./assignTeacherToSubSubjectInClass.types";
import { assignTeacherToSubSubjectInClassValidation } from "./assignTeacherToSubSubjectInClass.validation";

registerRoute<AssignTeacherToSubSubjectInClassRouteConfig>()({
  path: "/class/:classNewId/subject/assign-teacher",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: assignTeacherToSubSubjectInClassValidation.body,
  paramSchema: assignTeacherToSubSubjectInClassValidation.params,
  authorization: { action: ACTION_ENUM.ASSIGN, resource: RESOURCES_ENUM.TEACHER },
  controller: AssignTeacherToSubSubjectInClassController,
  isTransactionEnabled: false,
  platform: "web",
});
