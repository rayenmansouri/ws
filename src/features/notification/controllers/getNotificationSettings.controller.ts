import { RouteContext } from "../../../core/Routes/createRoutes";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { GenerateGetNotificationSettingTranslationKeysEnum } from "../constants/generateGetNotificationSetting.constants";
import { getNotificationSettingsService } from "../services/getNotificationSettings.service";

export const getNotificationSettingsController = async (routeContext: RouteContext<{}>) => {
  const result = await getNotificationSettingsService(
    routeContext.connection,
    routeContext.user._id,
  );

  return new SuccessResponse(
    GenerateGetNotificationSettingTranslationKeysEnum.GENERATE_GET_NOTIFICATION_SETTING_RESPONSE,
    result,
  );
};
