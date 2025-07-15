import { RouteContext } from "../../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFutureSessionByTeacherTranslationKeysEnum } from "../../../constants/teacher/getFutureSessionByTeacher.constants";
import { TGetFutureSessionByTeacherMobileRouteConfig } from "../../../routes/mobile/teacher/getFutureSessionByTeacher.mobile.routes";
import { getFutureSessionByTeacherMobileService } from "../../../services/mobile/teacher/getFutureSessionByTeacher.mobile.service";

export const getFutureSessionByTeacherMobileController = async (
  routeContext: RouteContext<TGetFutureSessionByTeacherMobileRouteConfig>,
) => {
  const result = await getFutureSessionByTeacherMobileService(
    routeContext.connection,
    routeContext.body,
    routeContext.user._id,
    routeContext.tenantId,
  );

  return new SuccessResponse(
    GetFutureSessionByTeacherTranslationKeysEnum.GET_FUTURE_SESSION_BY_TEACHER_RESPONSE,
    result,
  );
};
