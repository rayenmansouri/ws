import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnPayTeacherController } from "./unPayTeacher.controller";
import { UnPayTeacherRouteConfig } from "./unPayTeacher.types";
import { unPayTeacherValidation } from "./unPayTeacher.validation";

registerRoute<UnPayTeacherRouteConfig>()({
  path: "/teachers/:teacherNewId/undo-pay",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: unPayTeacherValidation.body,
  paramSchema: unPayTeacherValidation.params,
  authorization: { action: ACTION_ENUM.PAY, resource: RESOURCES_ENUM.TEACHER },
  controller: UnPayTeacherController,
  isTransactionEnabled: true,
  platform: "web",
});
