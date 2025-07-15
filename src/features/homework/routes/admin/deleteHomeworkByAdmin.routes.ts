import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { RouteConfig } from "../../../../core/Routes/createRoutes";
import { deleteHomeworkByAdminController } from "../../controllers/admin/deleteHomeworkByAdmin.controller";
import { deleteHomeworkByAdminTranslation } from "../../translations/admin/deleteHomeworkByAdmin.translations";
import { sharedHomeworkTranslation } from "../../translations/shared/shared.translation";
import { TDeleteHomeworkByAdminRouteConfig } from "../../types/admin/deleteHomeworkByAdmin.types";
import { deleteHomeworkByAdminValidation } from "../../validations/admin/deleteHomeworkByAdmin.validation";

export const deleteHomeworkByAdminRouteConfig: RouteConfig<TDeleteHomeworkByAdminRouteConfig> = {
  path: "/homework/:newId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteHomeworkByAdminValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.HOMEWORK },
  controller: deleteHomeworkByAdminController,
  withTransaction: true,
  translations: [deleteHomeworkByAdminTranslation, sharedHomeworkTranslation],
};
