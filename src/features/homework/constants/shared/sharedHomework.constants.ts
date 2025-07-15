import { TranslationPaths } from "../../../../translation/translationKeys";

export const enum sharedHomeworkTranslationKeysEnum {
  HOMEWORK_NOT_FOUND = "HOMEWORK_NOT_FOUND",
  TEACHER_NOT_FOUND = "TEACHER_NOT_FOUND",
  OPTIONAL_SUBJECT_NOT_FOUND = "OPTIONAL_SUBJECT_NOT_FOUND",
  CLASS_NOT_FOUND = "CLASS_NOT_FOUND",
  GET_HOMEWORK_RESPONSE = "GET_HOMEWORK_RESPONSE",
}

export const getHomeworkErrorResponse = (entity: "class" | "group" | "teacher") => {
  let errorMessage: sharedHomeworkTranslationKeysEnum | TranslationPaths;
  switch (entity) {
    case "class":
      errorMessage = sharedHomeworkTranslationKeysEnum.CLASS_NOT_FOUND;
      break;
    case "group":
      errorMessage = "notFound.group";
      break;
    case "teacher":
      errorMessage = sharedHomeworkTranslationKeysEnum.TEACHER_NOT_FOUND;
      break;
  }
  return errorMessage;
};
