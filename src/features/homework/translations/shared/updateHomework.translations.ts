import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { UpdateHomeworkTranslationKeysEnum } from "../../constants/shared/updateHomework.constants";

export const updateHomeworkTranslation: RouteTranslation<UpdateHomeworkTranslationKeysEnum> = {
  en: {
    [UpdateHomeworkTranslationKeysEnum.UPDATE_HOMEWORK_RESPONSE]: "Homework successfully updated",
    [UpdateHomeworkTranslationKeysEnum.HOMEWORK_NOT_BELONG_TO_TEACHER]:
      "This homework doesn't belong to you, you can't edit it",
    [UpdateHomeworkTranslationKeysEnum.SESSION_NOT_FOUND]: "Session not found",
    [UpdateHomeworkTranslationKeysEnum.SESSION_TO_DO_MUST_BE_IN_THE_FUTURE]:
      "Session must be in the future to assign homework",
  },
  fr: {
    [UpdateHomeworkTranslationKeysEnum.UPDATE_HOMEWORK_RESPONSE]: "Devoir mis à jour avec succès",
    [UpdateHomeworkTranslationKeysEnum.HOMEWORK_NOT_BELONG_TO_TEACHER]:
      "Ce devoir ne vous appartient pas, vous ne pouvez pas le modifier",
    [UpdateHomeworkTranslationKeysEnum.SESSION_NOT_FOUND]: "Session non trouvée",
    [UpdateHomeworkTranslationKeysEnum.SESSION_TO_DO_MUST_BE_IN_THE_FUTURE]:
      "La session doit être dans le futur pour attribuer un devoir",
  },
  ar: {
    [UpdateHomeworkTranslationKeysEnum.UPDATE_HOMEWORK_RESPONSE]: "تم تحديث الواجب بنجاح",
    [UpdateHomeworkTranslationKeysEnum.HOMEWORK_NOT_BELONG_TO_TEACHER]:
      "هذا الواجب ليس لك، لا يمكنك تعديله",
    [UpdateHomeworkTranslationKeysEnum.SESSION_NOT_FOUND]: "الجلسة غير موجودة",
    [UpdateHomeworkTranslationKeysEnum.SESSION_TO_DO_MUST_BE_IN_THE_FUTURE]:
      "يجب أن تكون الجلسة في المستقبل لتعيين الواجب",
  },
};
