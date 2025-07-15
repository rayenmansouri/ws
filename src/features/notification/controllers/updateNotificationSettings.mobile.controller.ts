import { TUpdateNotificationSettingsRouteConfig } from "./../types/updateNotificationSettings.mobile.types";
import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { UpdateNotificationSettingsTranslationKeysEnum } from "../constants/updateNotificationSettings.constants";

import { updateNotificationSettingsService } from "../services/updateNotificationSettings.service";

export const updateNotificationSettingsController = async (
  routeContext: RouteContext<TUpdateNotificationSettingsRouteConfig, true>,
) => {
  const result = await updateNotificationSettingsService(
    routeContext.connection,
    routeContext.user._id.toString(),
    routeContext.body,
    routeContext.session,
    routeContext.body.userAgent,
  );

  return new SuccessResponse(
    UpdateNotificationSettingsTranslationKeysEnum.UPDATE_NOTIFICATION_SETTINGS_RESPONSE,
    result,
  );
};
