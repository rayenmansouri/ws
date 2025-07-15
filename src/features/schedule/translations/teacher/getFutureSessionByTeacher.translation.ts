import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { GetFutureSessionByTeacherTranslationKeysEnum } from "../../constants/teacher/getFutureSessionByTeacher.constants";

export const getFutureSessionByTeacherTranslation: RouteTranslation<GetFutureSessionByTeacherTranslationKeysEnum> =
  {
    en: {
      [GetFutureSessionByTeacherTranslationKeysEnum.GET_FUTURE_SESSION_BY_TEACHER_RESPONSE]:
        "Session list retrieved successfully!",
    },
    fr: {
      [GetFutureSessionByTeacherTranslationKeysEnum.GET_FUTURE_SESSION_BY_TEACHER_RESPONSE]:
        "Liste des sessions récupérée avec succès !",
    },
    ar: {
      [GetFutureSessionByTeacherTranslationKeysEnum.GET_FUTURE_SESSION_BY_TEACHER_RESPONSE]:
        "تم استرجاع قائمة الجلسات بنجاح !",
    },
  };
