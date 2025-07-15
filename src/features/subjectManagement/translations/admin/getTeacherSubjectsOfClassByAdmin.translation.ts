import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { GetSubjectsOfClassByAdminTranslationKeysEnum } from "../../constants/admin/getTeacherSubjectsOfClassByAdmin.constants";

export const getSubjectsOfClassByAdminTranslation: RouteTranslation<GetSubjectsOfClassByAdminTranslationKeysEnum> =
  {
    en: {
      [GetSubjectsOfClassByAdminTranslationKeysEnum.GET_SUBJECTS_OF_CLASS_BY_ADMIN_RESPONSE]:
        "Subjects retrieved successfully",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_FOUND]: "Teacher not found",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_INCLUDED_IN_CLASS]:
        "Teacher is not included in this class",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.CLASS_NOT_FOUND]: "Class not found",
    },
    fr: {
      [GetSubjectsOfClassByAdminTranslationKeysEnum.GET_SUBJECTS_OF_CLASS_BY_ADMIN_RESPONSE]:
        "Les matières ont été récupérées avec succès",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_FOUND]: "Enseignant non trouvé",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_INCLUDED_IN_CLASS]:
        "L'enseignant n'est pas inclus dans cette classe",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.CLASS_NOT_FOUND]: "Classe non trouvée",
    },
    ar: {
      [GetSubjectsOfClassByAdminTranslationKeysEnum.GET_SUBJECTS_OF_CLASS_BY_ADMIN_RESPONSE]:
        "تم استرجاع المواد بنجاح",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_FOUND]: "لم يتم العثور على المعلم",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_INCLUDED_IN_CLASS]:
        "المعلم غير مدرج في هذا الصف",
      [GetSubjectsOfClassByAdminTranslationKeysEnum.CLASS_NOT_FOUND]: "لم يتم العثور على الصف",
    },
  };
