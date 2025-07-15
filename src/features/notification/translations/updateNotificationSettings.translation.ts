import { RouteTranslation } from "../../../core/Routes/createRoutes";
import { UpdateNotificationSettingsTranslationKeysEnum } from "../constants/updateNotificationSettings.constants";

export const updateNotificationSettingsTranslation: RouteTranslation<UpdateNotificationSettingsTranslationKeysEnum> =
  {
    en: {
      [UpdateNotificationSettingsTranslationKeysEnum.UPDATE_NOTIFICATION_SETTINGS_RESPONSE]:
        "Notification settings successfully updated",
      [UpdateNotificationSettingsTranslationKeysEnum.USER_AGENT_MUST_BE_PROVIDED]:
        "user agent must be provided",
    },
    fr: {
      [UpdateNotificationSettingsTranslationKeysEnum.UPDATE_NOTIFICATION_SETTINGS_RESPONSE]:
        "Paramètres de notification mis à jour avec succès",
      [UpdateNotificationSettingsTranslationKeysEnum.USER_AGENT_MUST_BE_PROVIDED]:
        "l'agent utilisateur doit être fourni",
    },
    ar: {
      [UpdateNotificationSettingsTranslationKeysEnum.UPDATE_NOTIFICATION_SETTINGS_RESPONSE]:
        "تم تحديث إعدادات الإشعارات بنجاح",
      [UpdateNotificationSettingsTranslationKeysEnum.USER_AGENT_MUST_BE_PROVIDED]:
        "يجب توفير وكيل المستخدم",
    },
  };
