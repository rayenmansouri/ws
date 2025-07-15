import { RouteTranslation } from "../../../core/Routes/createRoutes";
import { SendNotificationToUsersTranslationKeysEnum } from "../constants/sendNotificationToUsers.constants";

export const sendNotificationToUsersTranslation: RouteTranslation<SendNotificationToUsersTranslationKeysEnum> =
  {
    en: {
      [SendNotificationToUsersTranslationKeysEnum.SEND_NOTIFICATION_TO_USERS_RESPONSE]:
        "Notifications successfully sent",
      [SendNotificationToUsersTranslationKeysEnum.USER_NOT_FOUND]: "no user found",
    },
    fr: {
      [SendNotificationToUsersTranslationKeysEnum.SEND_NOTIFICATION_TO_USERS_RESPONSE]:
        "Notifications envoyées avec succès",
      [SendNotificationToUsersTranslationKeysEnum.USER_NOT_FOUND]: "aucun utilisateur trouvé",
    },
    ar: {
      [SendNotificationToUsersTranslationKeysEnum.SEND_NOTIFICATION_TO_USERS_RESPONSE]:
        "تم إرسال الإشعارات بنجاح",
      [SendNotificationToUsersTranslationKeysEnum.USER_NOT_FOUND]: "لم يتم العثور على مستخدم",
    },
  };
