import { Notification } from "../../../../../feature/notifications/notification.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListNotificationsValidation } from "./listNotifications.validation";

export type ListNotificationsRouteConfig = ListNotificationsValidation & { files: never };
export type ListNotificationsResponse = ResponseWithPagination<Notification>;
