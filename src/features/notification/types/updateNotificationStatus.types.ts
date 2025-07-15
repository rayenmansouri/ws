import { TUpdateNotificationStatusValidation } from "./../validations/updateNotificationStatus.validation";
import { INotification } from "./../../../database/schema/notification/notification.schema";
export type TUpdateNotificationStatusResponse = INotification[];
export type TUpdateNotificationStatusRouteConfig = TUpdateNotificationStatusValidation;
