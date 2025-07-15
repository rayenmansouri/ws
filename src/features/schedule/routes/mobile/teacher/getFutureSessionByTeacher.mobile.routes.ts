import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { RouteConfig } from "../../../../../core/Routes/createRoutes";
import { getFutureSessionByTeacherMobileController } from "../../../controllers/mobile/teacher/getFutureSessionByTeacher.mobile.controller";
import { getFutureSessionOfTeacherTranslation } from "../../../translations/admin/getFutureSessionOfTeacher.translation";
import { sharedScheduleManagementTranslation } from "../../../translations/shared/sharedScheduleManagement.translation";
import { getFutureSessionByTeacherTranslation } from "../../../translations/teacher/getFutureSessionByTeacher.translation";
import {
  getFutureSessionByTeacherMobileValidation,
  TGetFutureSessionByTeacherMobileValidation,
} from "../../../validations/teacher/mobile/getFutureSessionByTeacher.mobile.validation";

export type TGetFutureSessionByTeacherMobileRouteConfig =
  TGetFutureSessionByTeacherMobileValidation;

export const getFutureSessionByTeacherMobileRouteConfig: RouteConfig<TGetFutureSessionByTeacherMobileRouteConfig> =
  {
    path: "/session/future-sessions",
    method: "post",
    endUser: END_USER_ENUM.TEACHER,
    bodySchema: getFutureSessionByTeacherMobileValidation.body,
    controller: getFutureSessionByTeacherMobileController,
    translations: [
      getFutureSessionOfTeacherTranslation,
      sharedScheduleManagementTranslation,
      getFutureSessionByTeacherTranslation,
    ],
  };
