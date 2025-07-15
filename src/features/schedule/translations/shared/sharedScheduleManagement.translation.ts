import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { SharedScheduleManagementTranslationKeysEnum } from "../../constants/shared/sharedScheduleManagement.constants";

export const sharedScheduleManagementTranslation: RouteTranslation<SharedScheduleManagementTranslationKeysEnum> =
  {
    en: {
      [SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND]: "Class not found",
      [SharedScheduleManagementTranslationKeysEnum.SESSION_NOT_FOUND]: "Session not found",
      [SharedScheduleManagementTranslationKeysEnum.STUDENT_NOT_FOUND]: "Student not found",
      [SharedScheduleManagementTranslationKeysEnum.TEACHER_NOT_FOUND]: "teacher not found",
      [SharedScheduleManagementTranslationKeysEnum.SHARED_SCHEDULE_RESPONSE]:
        "Shedule retrieved successfully",
    },
    fr: {
      [SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND]: "Classe non trouvée",
      [SharedScheduleManagementTranslationKeysEnum.SESSION_NOT_FOUND]: "Session non trouvée",
      [SharedScheduleManagementTranslationKeysEnum.STUDENT_NOT_FOUND]: "Élève non trouvé",
      [SharedScheduleManagementTranslationKeysEnum.TEACHER_NOT_FOUND]: "Professeur non trouvé",
      [SharedScheduleManagementTranslationKeysEnum.SHARED_SCHEDULE_RESPONSE]:
        "Emplois récupéré avec succès",
    },
    ar: {
      [SharedScheduleManagementTranslationKeysEnum.CLASS_NOT_FOUND]: "لم يتم العثور على الصف",
      [SharedScheduleManagementTranslationKeysEnum.SESSION_NOT_FOUND]: "لم يتم العثور على الجلسة",
      [SharedScheduleManagementTranslationKeysEnum.STUDENT_NOT_FOUND]: "لم يتم العثور على التلميذ",
      [SharedScheduleManagementTranslationKeysEnum.TEACHER_NOT_FOUND]: "لم يتم العثور على المعلم",
      [SharedScheduleManagementTranslationKeysEnum.SHARED_SCHEDULE_RESPONSE]:
        "تم استرجاع الجدول بنجاح",
    },
  };
