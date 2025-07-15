import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { RouteConfig } from "../../../../../core/Routes/createRoutes";
import { getFutureSessionByTeacherController } from "../../../controllers/web/teacher/getFutureSessionByTeacher.controller";
import { getFutureSessionOfTeacherTranslation } from "../../../translations/admin/getFutureSessionOfTeacher.translation";
import { sharedScheduleManagementTranslation } from "../../../translations/shared/sharedScheduleManagement.translation";
import { getFutureSessionByTeacherTranslation } from "../../../translations/teacher/getFutureSessionByTeacher.translation";
import { TGetFutureSessionByTeacherRouteConfig } from "../../../types/teacher/getFutureSessionByTeacher.types";
import { getFutureSessionByTeacherValidation } from "../../../validations/teacher/getFutureSessionByTeacher.validation";

export const getFutureSessionByTeacherRouteConfig: RouteConfig<TGetFutureSessionByTeacherRouteConfig> =
  {
    path: "/session/future-sessions",
    method: "get",
    endUser: END_USER_ENUM.TEACHER,
    querySchema: getFutureSessionByTeacherValidation.query,
    controller: getFutureSessionByTeacherController,
    translations: [
      getFutureSessionOfTeacherTranslation,
      sharedScheduleManagementTranslation,
      getFutureSessionByTeacherTranslation,
    ],
  };
