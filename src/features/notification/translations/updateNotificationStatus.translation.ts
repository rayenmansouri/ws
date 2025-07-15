import { RouteTranslation } from "../../../core/Routes/createRoutes";
import { UpdateNotificationStatusTranslationKeysEnum } from "../constants/updateNotificationStatus.constants";

export const updateNotificationStatusTranslation: RouteTranslation<UpdateNotificationStatusTranslationKeysEnum> =
  {
    en: {
      [UpdateNotificationStatusTranslationKeysEnum.UPDATE_NOTIFICATION_STATUS_RESPONSE]:
        "notification successfully updated",
    },
    fr: {
      [UpdateNotificationStatusTranslationKeysEnum.UPDATE_NOTIFICATION_STATUS_RESPONSE]:
        "notification mise à jour avec succès",
    },
    ar: {
      [UpdateNotificationStatusTranslationKeysEnum.UPDATE_NOTIFICATION_STATUS_RESPONSE]:
        "تم تحديث الإشعار بنجاح",
    },
  };
