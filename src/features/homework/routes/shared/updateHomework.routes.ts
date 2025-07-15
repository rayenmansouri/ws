import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../constants/ActionsResource";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../../constants/globalEnums";
import { RouteConfig } from "../../../../core/Routes/createRoutes";
import { updateHomeworkController } from "../../controllers/shared/updateHomework.controller";
import { sharedHomeworkTranslation } from "../../translations/shared/shared.translation";
import { updateHomeworkTranslation } from "../../translations/shared/updateHomework.translations";
import { TUpdateHomeworkRouteConfig } from "../../types/shared/updateHomework.types";
import { updateHomeworkValidation } from "../../validations/shared/updateHomework.validation";

export const updateHomeworkConfig = (
  endUser: TEndAdministrationUserEnums,
): RouteConfig<TUpdateHomeworkRouteConfig> => {
  const updateHomeworkConfig: RouteConfig<TUpdateHomeworkRouteConfig> = {
    path: "/homework/:homeworkNewId",
    method: "patch",
    controller: updateHomeworkController(endUser),
    bodySchema: updateHomeworkValidation.body,
    paramSchema: updateHomeworkValidation.params,
    endUser,
    authorization:
      endUser === END_USER_ENUM.ADMIN
        ? { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.HOMEWORK }
        : undefined,
    translations: [updateHomeworkTranslation, sharedHomeworkTranslation],
    upload: { fields: [{ name: "homeworks" }] },
    withTransaction: true,
  };
  return updateHomeworkConfig;
};
