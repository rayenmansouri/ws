import { TGetFutureSessionOfTeacherRouteConfig } from "./../../../types/admin/getFutureSessionOfTeacher.types";
import { RouteContext } from "../../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFutureSessionOfTeacherTranslationKeysEnum } from "../../../constants/admin/getFutureSessionOfTeacher.constants";
import { getFutureSessionOfTeacherService } from "../../../services/admin/getFutureSessionOfTeacher.service";

export const getFutureSessionOfTeacherController = async (
  routeContext: RouteContext<TGetFutureSessionOfTeacherRouteConfig>,
) => {
  const result = await getFutureSessionOfTeacherService(
    routeContext.connection,
    routeContext.params.teacherNewId,
    routeContext.query,
    routeContext.tenantId,
  );

  return new SuccessResponse(
    GetFutureSessionOfTeacherTranslationKeysEnum.GET_FUTURE_SESSION_OF_TEACHER_RESPONSE,
    result,
  );
};
