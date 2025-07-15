import { RouteTranslation } from "../../../../core/Routes/createRoutes";
import { DeleteHomeworkByAdminTranslationKeysEnum } from "../../constants/admin/deleteHomeworkByAdmin.constants";

export const deleteHomeworkByAdminTranslation: RouteTranslation<DeleteHomeworkByAdminTranslationKeysEnum> =
  {
    en: {
      [DeleteHomeworkByAdminTranslationKeysEnum.DELETE_HOMEWORK_BY_ADMIN_RESPONSE]:
        "Homework deleted successfully",
    },
    fr: {
      [DeleteHomeworkByAdminTranslationKeysEnum.DELETE_HOMEWORK_BY_ADMIN_RESPONSE]:
        "Devoir supprimé avec succès",
    },
    ar: {
      [DeleteHomeworkByAdminTranslationKeysEnum.DELETE_HOMEWORK_BY_ADMIN_RESPONSE]:
        "تم حذف الواجب بنجاح",
    },
  };
