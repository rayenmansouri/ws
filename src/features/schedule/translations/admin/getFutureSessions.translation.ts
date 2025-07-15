import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { GetFutureSessionsTranslationKeysEnum } from "../../constants/admin/getFutureSessions.constants";

export const getFutureSessionsTranslation: RouteTranslation<GetFutureSessionsTranslationKeysEnum> =
  {
    en: {
      [GetFutureSessionsTranslationKeysEnum.GET_FUTURE_SESSIONS_RESPONSE]:
        "Session list retrieved successfully!",
    },
    fr: {
      [GetFutureSessionsTranslationKeysEnum.GET_FUTURE_SESSIONS_RESPONSE]:
        "Liste des sessions récupérée avec succès !",
    },
    ar: {
      [GetFutureSessionsTranslationKeysEnum.GET_FUTURE_SESSIONS_RESPONSE]:
        "تم استرجاع قائمة الجلسات بنجاح!",
    },
  };
