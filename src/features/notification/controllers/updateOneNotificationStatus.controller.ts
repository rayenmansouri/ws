import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { UpdateNotificationStatusTranslationKeysEnum } from "../constants/updateNotificationStatus.constants";
import { updateOneNotificationStatusService } from "../services/updateOneNotificationStatus.service";
import { TUpdateOneNotificationStatusRouteConfig } from "../types/updateOneNotificationStatus.types";

export const updateOneNotificationStatusController = async (
  routeContext: RouteContext<TUpdateOneNotificationStatusRouteConfig>,
) => {
  const result = await updateOneNotificationStatusService(
    routeContext.connection,
    routeContext.user._id,
    routeContext.params.broadcastId,
  );

  return new SuccessResponse(
    UpdateNotificationStatusTranslationKeysEnum.UPDATE_NOTIFICATION_STATUS_RESPONSE,
    result,
  );
};
