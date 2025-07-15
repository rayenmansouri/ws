import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { GetFutureSessionOfTeacherTranslationKeysEnum } from "../../constants/admin/getFutureSessionOfTeacher.constants";

export const getFutureSessionOfTeacherTranslation: RouteTranslation<GetFutureSessionOfTeacherTranslationKeysEnum> =
  {
    en: {
      [GetFutureSessionOfTeacherTranslationKeysEnum.GET_FUTURE_SESSION_OF_TEACHER_RESPONSE]:
        "Session list retrieved successfully!",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUB_SUBJECT_TYPE_NOT_FOUND]:
        "sub Subject type not found!",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUBJECT_TYPE_NOT_FOUND]:
        "Subject type not found!",
    },
    fr: {
      [GetFutureSessionOfTeacherTranslationKeysEnum.GET_FUTURE_SESSION_OF_TEACHER_RESPONSE]:
        "Liste des sessions récupérée avec succès !",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUB_SUBJECT_TYPE_NOT_FOUND]:
        "Type de sous-matière non trouvé !",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUBJECT_TYPE_NOT_FOUND]:
        "Type de matière non trouvé !",
    },
    ar: {
      [GetFutureSessionOfTeacherTranslationKeysEnum.GET_FUTURE_SESSION_OF_TEACHER_RESPONSE]:
        "تم استرجاع قائمة الجلسات بنجاح!",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUB_SUBJECT_TYPE_NOT_FOUND]:
        "نوع الجزء الفرعي غير موجود!",
      [GetFutureSessionOfTeacherTranslationKeysEnum.SUBJECT_TYPE_NOT_FOUND]:
        "نوع المادة غير موجود!",
    },
  };
