import { RouteContext } from "../../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFutureSessionByTeacherTranslationKeysEnum } from "../../../constants/teacher/getFutureSessionByTeacher.constants";
import { getFutureSessionByTeacherService } from "../../../services/teacher/getFutureSessionByTeacher.service";
import { TGetFutureSessionByTeacherRouteConfig } from "../../../types/teacher/getFutureSessionByTeacher.types";

export const getFutureSessionByTeacherController = async (
  routeContext: RouteContext<TGetFutureSessionByTeacherRouteConfig>,
) => {
  const result = await getFutureSessionByTeacherService(
    routeContext.connection,
    routeContext.query,
    routeContext.user._id,
    routeContext.tenantId,
  );

  return new SuccessResponse(
    GetFutureSessionByTeacherTranslationKeysEnum.GET_FUTURE_SESSION_BY_TEACHER_RESPONSE,
    result,
  );
};
