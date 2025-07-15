import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { GetSubjectOfTeacherClassTranslationKeysEnum } from "../../constants/teacher/getSubjectOfTeacherClass.constants";

export const GetSubjectOfTeacherClassTranslation: RouteTranslation<GetSubjectOfTeacherClassTranslationKeysEnum> =
  {
    ar: {
      [GetSubjectOfTeacherClassTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]:
        "المادة الاختيارية غير موجودة",
    },
    fr: {
      [GetSubjectOfTeacherClassTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]:
        "Sujet optionnel non trouvé",
    },
    en: {
      [GetSubjectOfTeacherClassTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]:
        "Optional Subject Not found",
    },
  };
