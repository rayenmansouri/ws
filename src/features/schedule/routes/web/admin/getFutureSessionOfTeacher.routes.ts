import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { RouteConfig } from "../../../../../core/Routes/createRoutes";
import { getFutureSessionOfTeacherController } from "../../../controllers/web/admin/getFutureSessionOfTeacher.controller";
import { getFutureSessionOfTeacherTranslation } from "../../../translations/admin/getFutureSessionOfTeacher.translation";
import { sharedScheduleManagementTranslation } from "../../../translations/shared/sharedScheduleManagement.translation";
import { getFutureSessionOfTeacherValidation } from "../../../validations/admin/getFutureSessionOfTeacher.validation";
import { TGetFutureSessionOfTeacherRouteConfig } from "./../../../types/admin/getFutureSessionOfTeacher.types";

export const getFutureSessionOfTeacherRouteConfig: RouteConfig<TGetFutureSessionOfTeacherRouteConfig> =
  {
    path: "/teacher/:teacherNewId/session/future-sessions",
    method: "get",
    endUser: END_USER_ENUM.ADMIN,
    querySchema: getFutureSessionOfTeacherValidation.query,
    paramSchema: getFutureSessionOfTeacherValidation.params,
    authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SESSION },
    controller: getFutureSessionOfTeacherController,
    translations: [getFutureSessionOfTeacherTranslation, sharedScheduleManagementTranslation],
  };
