import { RouteTranslation } from "../../../core/Routes/createRoutes";
import { GenerateGetNotificationSettingTranslationKeysEnum } from "../constants/generateGetNotificationSetting.constants";

export const generateGetNotificationSettingTranslation: RouteTranslation<GenerateGetNotificationSettingTranslationKeysEnum> =
  {
    en: {
      [GenerateGetNotificationSettingTranslationKeysEnum.GENERATE_GET_NOTIFICATION_SETTING_RESPONSE]:
        "Notification settings retrieved successfully!",
    },
    fr: {
      [GenerateGetNotificationSettingTranslationKeysEnum.GENERATE_GET_NOTIFICATION_SETTING_RESPONSE]:
        "Paramètres de notification récupérés avec succès!",
    },
    ar: {
      [GenerateGetNotificationSettingTranslationKeysEnum.GENERATE_GET_NOTIFICATION_SETTING_RESPONSE]:
        "تم استرجاع إعدادات الإشعارات بنجاح!",
    },
  };
