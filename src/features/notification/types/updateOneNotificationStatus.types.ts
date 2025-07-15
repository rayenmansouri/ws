import { TUpdateOneNotificationStatusValidation } from "../validations/updateOneNotificationStatus.validation";
import { INotification } from "../../../database/schema/notification/notification.schema";
export type TUpdateOneNotificationStatusResponse = INotification;
export type TUpdateOneNotificationStatusRouteConfig = TUpdateOneNotificationStatusValidation;
