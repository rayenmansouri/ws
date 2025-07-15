import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { RouteConfig } from "../../../../../core/Routes/createRoutes";
import { getFutureSessionsController } from "../../../controllers/web/admin/getFutureSessions.controller";
import { getFutureSessionOfTeacherTranslation } from "../../../translations/admin/getFutureSessionOfTeacher.translation";
import { getFutureSessionsTranslation } from "../../../translations/admin/getFutureSessions.translation";
import { TGetFutureSessionsRouteConfig } from "../../../types/admin/getFutureSessions.types";
import { getFutureSessionsValidation } from "../../../validations/admin/getFutureSessions.validation";

export const getFutureSessionsRouteConfig: RouteConfig<TGetFutureSessionsRouteConfig> = {
  path: "/session/future-sessions",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getFutureSessionsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SESSION },
  controller: getFutureSessionsController,
  translations: [getFutureSessionOfTeacherTranslation, getFutureSessionsTranslation],
};
