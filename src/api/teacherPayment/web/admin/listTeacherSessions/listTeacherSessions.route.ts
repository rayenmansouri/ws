import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListTeacherSessionsController } from "./listTeacherSessions.controller";
import { ListTeacherSessionsRouteConfig } from "./listTeacherSessions.types";
import { listTeacherSessionsValidation } from "./listTeacherSessions.validation";

registerRoute<ListTeacherSessionsRouteConfig>()({
  path: "/teachers/:teacherNewId/payment/sessions",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listTeacherSessionsValidation.query,
  paramSchema: listTeacherSessionsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SESSION },
  controller: ListTeacherSessionsController,
  isTransactionEnabled: false,
  platform: "web",
});
