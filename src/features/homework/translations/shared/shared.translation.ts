import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { sharedHomeworkTranslationKeysEnum } from "../../constants/shared/sharedHomework.constants";

export const sharedHomeworkTranslation: RouteTranslation<sharedHomeworkTranslationKeysEnum> = {
  en: {
    [sharedHomeworkTranslationKeysEnum.HOMEWORK_NOT_FOUND]: "Homework not found",
    [sharedHomeworkTranslationKeysEnum.TEACHER_NOT_FOUND]: "Teacher not found",
    [sharedHomeworkTranslationKeysEnum.GET_HOMEWORK_RESPONSE]:
      "List of homework successfully retrieved",
    [sharedHomeworkTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]: "Optional subject not found",
    [sharedHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "Class not found",
  },
  fr: {
    [sharedHomeworkTranslationKeysEnum.HOMEWORK_NOT_FOUND]: "Devoir non trouvé",
    [sharedHomeworkTranslationKeysEnum.TEACHER_NOT_FOUND]: "Professeur non trouvé",
    [sharedHomeworkTranslationKeysEnum.GET_HOMEWORK_RESPONSE]:
      "Liste des devoirs récupérée avec succès",
    [sharedHomeworkTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]:
      "Matière optionnelle non trouvée",
    [sharedHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "Classe non trouvée",
  },
  ar: {
    [sharedHomeworkTranslationKeysEnum.HOMEWORK_NOT_FOUND]: "الواجب المنزلي غير موجود",
    [sharedHomeworkTranslationKeysEnum.TEACHER_NOT_FOUND]: "المعلم غير موجود",
    [sharedHomeworkTranslationKeysEnum.GET_HOMEWORK_RESPONSE]: "تم استرجاع قائمة الواجبات بنجاح",
    [sharedHomeworkTranslationKeysEnum.OPTIONAL_SUBJECT_NOT_FOUND]: "الموضوع الاختياري غير موجود",
    [sharedHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "الصف غير موجود",
  },
};
