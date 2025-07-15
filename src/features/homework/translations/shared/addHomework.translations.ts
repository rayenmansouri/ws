import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { AddHomeworkTranslationKeysEnum } from "../../constants/shared/addHomework.constants";

export const addHomeworkTranslation: RouteTranslation<AddHomeworkTranslationKeysEnum> = {
  en: {
    [AddHomeworkTranslationKeysEnum.ADD_HOMEWORK_BY_ADMIN_RESPONSE]:
      "Homework successfully created",
    [AddHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "Class not found",
    [AddHomeworkTranslationKeysEnum.SESSION_GIVEN_NOT_FOUND]: "Session given not found",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_NOT_FOUND]: "Session to do not found",
    [AddHomeworkTranslationKeysEnum.GROUP_DOES_NOT_BELONG_TO_THIS_CLASS]:
      "This group doesn't belong to this class",
    [AddHomeworkTranslationKeysEnum.HOMEWORK_MUST_BE_RELATED_TO_TOPIC]:
      "Homework must be related to one of subject, sub-subject, or optional subject",
    [AddHomeworkTranslationKeysEnum.SESSION_DOES_NOT_HAVE_TEACHER_ASSESS]:
      "This session does not have a teacher assigned",
    [AddHomeworkTranslationKeysEnum.YOU_ARE_NOT_THE_OWNER_OF_THIS_SESSION]:
      "You are not the owner of this session",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBJECTTYPE_SESSION]:
      "Session to do or given is not for a subject type session",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBSUBJECTTYPE_SESSION]:
      "Session to do or given is not for a sub-subject type session",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_GROUP_SESSION]:
      "Session to do or given is not for an optional subject session",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_CLASS_SESSION]:
      "Session to do or given is not for a class session",
  },
  fr: {
    [AddHomeworkTranslationKeysEnum.ADD_HOMEWORK_BY_ADMIN_RESPONSE]: "Devoirs créés avec succès.",
    [AddHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "Classe non trouvée",
    [AddHomeworkTranslationKeysEnum.SESSION_GIVEN_NOT_FOUND]: "Session donnée non trouvée",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_NOT_FOUND]: "Session à faire non trouvée",
    [AddHomeworkTranslationKeysEnum.GROUP_DOES_NOT_BELONG_TO_THIS_CLASS]:
      "Ce groupe n'appartient pas à cette classe",
    [AddHomeworkTranslationKeysEnum.HOMEWORK_MUST_BE_RELATED_TO_TOPIC]:
      "Les devoirs doivent être liés à une matière, une sous-matière ou une matière optionnelle",
    [AddHomeworkTranslationKeysEnum.SESSION_DOES_NOT_HAVE_TEACHER_ASSESS]:
      "Cette session n'a pas d'enseignant assigné",
    [AddHomeworkTranslationKeysEnum.YOU_ARE_NOT_THE_OWNER_OF_THIS_SESSION]:
      "Vous n'êtes pas le propriétaire de cette session",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBJECTTYPE_SESSION]:
      "La session à faire ou donnée n'est pas pour un type de matière",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBSUBJECTTYPE_SESSION]:
      "La session à faire ou donnée n'est pas pour un type de sous-matière",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_GROUP_SESSION]:
      "La session à faire ou donnée n'est pas pour un type de matière optionnelle",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_CLASS_SESSION]:
      "La session à faire ou donnée n'est pas pour une session de classe",
  },
  ar: {
    [AddHomeworkTranslationKeysEnum.ADD_HOMEWORK_BY_ADMIN_RESPONSE]: "تم إنشاء الواجب بنجاح.",
    [AddHomeworkTranslationKeysEnum.CLASS_NOT_FOUND]: "لم يتم العثور على الصف",
    [AddHomeworkTranslationKeysEnum.SESSION_GIVEN_NOT_FOUND]: "لم يتم العثور على الحصة المقدمة",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_NOT_FOUND]:
      "لم يتم العثور على الحصة المراد تنفيذها",
    [AddHomeworkTranslationKeysEnum.GROUP_DOES_NOT_BELONG_TO_THIS_CLASS]:
      "هذه المجموعة لا تنتمي إلى هذا الصف",
    [AddHomeworkTranslationKeysEnum.HOMEWORK_MUST_BE_RELATED_TO_TOPIC]:
      "يجب أن يكون الواجب متعلقًا بموضوع، أو موضوع فرعي، أو موضوع اختياري",
    [AddHomeworkTranslationKeysEnum.SESSION_DOES_NOT_HAVE_TEACHER_ASSESS]:
      "هذه الحصة ليس لديها معلم معين",
    [AddHomeworkTranslationKeysEnum.YOU_ARE_NOT_THE_OWNER_OF_THIS_SESSION]:
      "أنت لست مالك هذه الحصة",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBJECTTYPE_SESSION]:
      "الحصة المراد تنفيذها أو المقدمة ليست لجلسة من نوع موضوع",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_SUBSUBJECTTYPE_SESSION]:
      "الحصة المراد تنفيذها أو المقدمة ليست لجلسة من نوع موضوع فرعي",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_GROUP_SESSION]:
      "الحصة المراد تنفيذها أو المقدمة ليست لجلسة من نوع موضوع اختياري",
    [AddHomeworkTranslationKeysEnum.SESSION_TO_DO_OR_SESSION_GIVEN_IN_NOT_FOR_A_CLASS_SESSION]:
      "الحصة المراد تنفيذها أو المقدمة ليست لجلسة صفية",
  },
};
