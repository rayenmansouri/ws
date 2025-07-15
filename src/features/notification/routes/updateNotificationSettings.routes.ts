import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { updateNotificationSettingsController } from "../controllers/updateNotificationSettings.controller";
import { updateNotificationSettingsTranslation } from "../translations/updateNotificationSettings.translation";
import { updateNotificationSettingsValidation } from "../validations/updateNotificationSettings.validation";
import { TUpdateNotificationSettingsRouteConfig } from "./../types/updateNotificationSettings.types";

export const generateUpdateNotificationSettingsRoutesConfig = (entity: TEndUserEnum) => {
  const updateNotificationSettingsRouteConfig: RouteConfig<TUpdateNotificationSettingsRouteConfig> =
    {
      path: `/notifications/settings`,
      method: "put",
      endUser: entity,
      bodySchema: updateNotificationSettingsValidation.body,
      controller: updateNotificationSettingsController,
      translations: [updateNotificationSettingsTranslation],
      withTransaction: true,
    };
  return updateNotificationSettingsRouteConfig;
};
