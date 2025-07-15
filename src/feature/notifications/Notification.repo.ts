import { BaseRepo } from "../../core/BaseRepo";
import { TNotificationStatusEnum } from "../../features/notification/constants/constants";
import { ResponseWithPagination } from "../../newDatabase/mongo/types";
import { ID } from "../../types/BaseEntity";
import { ListOptions } from "../../types/types";
import { Notification, NotificationMetaData } from "./notification.entity";

export abstract class NotificationRepo extends BaseRepo<NotificationMetaData> {
  abstract listNotifications(
    filter: {
      userId: ID;
      status?: TNotificationStatusEnum;
      startDate?: Date;
      endDate?: Date;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Notification>>;

  abstract getUnseenNotificationsNumberOfUser(userId: ID): Promise<number>;
}
