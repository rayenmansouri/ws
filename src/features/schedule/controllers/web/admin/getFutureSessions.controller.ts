import { RouteContext } from "../../../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetFutureSessionsTranslationKeysEnum } from "../../../constants/admin/getFutureSessions.constants";
import { TGetFutureSessionsRouteConfig } from "../../../types/admin/getFutureSessions.types";
import { getFutureSessionsService } from "../../../services/admin/getFutureSessions.service";

export const getFutureSessionsController = async (
  routeContext: RouteContext<TGetFutureSessionsRouteConfig>,
) => {
  const result = await getFutureSessionsService(
    routeContext.connection,
    routeContext.query,
    routeContext.tenantId,
  );

  return new SuccessResponse(
    GetFutureSessionsTranslationKeysEnum.GET_FUTURE_SESSIONS_RESPONSE,
    result,
  );
};
