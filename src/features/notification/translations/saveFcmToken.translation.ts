import { RouteTranslation } from "../../../core/Routes/createRoutes";
import { SaveFcmTokenTranslationKeysEnum } from "../constants/saveFcmToken.constants";

export const saveFcmTokenTranslation: RouteTranslation<SaveFcmTokenTranslationKeysEnum> = {
  en: {
    [SaveFcmTokenTranslationKeysEnum.SAVE_FCM_TOKEN_RESPONSE]: "FCM token successfully saved",
    [SaveFcmTokenTranslationKeysEnum.USER_AGENT_MUST_BE_TRUTHY]: "User agent must be truthy",
    [SaveFcmTokenTranslationKeysEnum.NOTIFICATION_SETTING_NOT_FOUND]:
      "Notification settings not found",
  },
  fr: {
    [SaveFcmTokenTranslationKeysEnum.SAVE_FCM_TOKEN_RESPONSE]:
      "Le jeton FCM a été enregistré avec succès",
    [SaveFcmTokenTranslationKeysEnum.USER_AGENT_MUST_BE_TRUTHY]:
      "L'agent utilisateur doit être vrai",
    [SaveFcmTokenTranslationKeysEnum.NOTIFICATION_SETTING_NOT_FOUND]:
      "Paramètres de notification introuvables",
  },
  ar: {
    [SaveFcmTokenTranslationKeysEnum.SAVE_FCM_TOKEN_RESPONSE]: "تم حفظ رمز FCM بنجاح",
    [SaveFcmTokenTranslationKeysEnum.USER_AGENT_MUST_BE_TRUTHY]: "يجب أن يكون وكيل المستخدم صحيحاً",
    [SaveFcmTokenTranslationKeysEnum.NOTIFICATION_SETTING_NOT_FOUND]:
      "إعدادات الإشعارات غير موجودة",
  },
};
