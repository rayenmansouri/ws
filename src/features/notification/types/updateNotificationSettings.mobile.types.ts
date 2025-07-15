import { TUpdateNotificationSettingsValidation } from "./../validations/updateNotificationSettings.mobile.validation";
import { INotificationSettings } from "./../../../database/schema/notification/notificationSettings.schema";
export type TUpdateNotificationSettingsResponse = INotificationSettings;
export type TUpdateNotificationSettingsRouteConfig = TUpdateNotificationSettingsValidation;
