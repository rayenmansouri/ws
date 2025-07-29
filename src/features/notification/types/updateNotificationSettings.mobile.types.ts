import { NotificationSettings } from "../../../feature/notifications/NotificationSettings.entity";
import { TUpdateNotificationSettingsValidation } from "./../validations/updateNotificationSettings.mobile.validation";

export type TUpdateNotificationSettingsResponse = NotificationSettings;
export type TUpdateNotificationSettingsRouteConfig = TUpdateNotificationSettingsValidation;
