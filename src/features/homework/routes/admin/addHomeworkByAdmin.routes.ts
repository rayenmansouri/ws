import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { RouteConfig } from "../../../../core/Routes/createRoutes";
import { FilesInRequest } from "../../../../types/app-request";
import { addHomeworkByAdminController } from "../../controllers/admin/addHomeworkByAdmin.controller";
import { addHomeworkTranslation } from "../../translations/shared/addHomework.translations";
import { sharedHomeworkTranslation } from "../../translations/shared/shared.translation";
import {
  TAddHomeworkByAdminValidation,
  addHomeworkByAdminValidation,
} from "../../validations/admin/addHomeworkByAdmin.validation";

export type TAddHomeworkByAdminRouteConfig = TAddHomeworkByAdminValidation & {
  files: FilesInRequest<"homeworks">;
};

export const addHomeworkByAdminRouteConfig: RouteConfig<TAddHomeworkByAdminRouteConfig> = {
  path: "/homework",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addHomeworkByAdminValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.HOMEWORK },
  controller: addHomeworkByAdminController,
  translations: [addHomeworkTranslation, sharedHomeworkTranslation],
  withTransaction: true,
  upload: { fields: [{ name: "homeworks" }] },
};
