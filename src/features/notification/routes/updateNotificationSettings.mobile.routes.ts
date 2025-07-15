import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { updateNotificationSettingsController } from "../controllers/updateNotificationSettings.mobile.controller";
import { updateNotificationSettingsTranslation } from "../translations/updateNotificationSettings.translation";
import { updateNotificationSettingsValidation } from "../validations/updateNotificationSettings.mobile.validation";
import { TUpdateNotificationSettingsRouteConfig } from "./../types/updateNotificationSettings.mobile.types";

export const generateUpdateNotificationSettingsConfigRoutes = (entity: TEndUserEnum) => {
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
