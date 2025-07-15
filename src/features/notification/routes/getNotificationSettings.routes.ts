import { TEndUserEnum } from "../../../constants/globalEnums";
import { RouteConfig } from "../../../core/Routes/createRoutes";
import { getNotificationSettingsController } from "../controllers/getNotificationSettings.controller";
import { generateGetNotificationSettingTranslation } from "../translations/generateGetNotificationSetting.translation";
import { TGetNotificationSettingsRouteConfig } from "./../types/getNotificationSettings.types";

export const generateGetNotificationSettingsRoutesConfig = (entity: TEndUserEnum) => {
  const getNotificationSettingsRouteConfig: RouteConfig<TGetNotificationSettingsRouteConfig> = {
    path: `/notifications/settings`,
    method: "get",
    endUser: entity,
    controller: getNotificationSettingsController,
    translations: [generateGetNotificationSettingTranslation],
  };
  return getNotificationSettingsRouteConfig;
};
