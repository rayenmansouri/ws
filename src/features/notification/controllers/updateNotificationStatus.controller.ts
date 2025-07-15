import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { UpdateNotificationStatusTranslationKeysEnum } from "../constants/updateNotificationStatus.constants";
import { updateNotificationStatusService } from "../services/updateNotificationStatus.service";

export const updateNotificationStatusController = async (routeContext: RouteContext<{}>) => {
  const result = await updateNotificationStatusService(
    routeContext.connection,
    routeContext.user._id,
  );

  return new SuccessResponse(
    UpdateNotificationStatusTranslationKeysEnum.UPDATE_NOTIFICATION_STATUS_RESPONSE,
    result,
  );
};
