import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  Notification,
  NotificationMetaData,
} from "../../../feature/notifications/notification.entity";
import { NotificationRepo } from "../../../feature/notifications/Notification.repo";
import {
  NOTIFICATION_STATUS_ENUM,
  TNotificationStatusEnum,
} from "../../../features/notification/constants/constants";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoNotificationRepo
  extends MongoBaseRepo<NotificationMetaData>
  implements NotificationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "notification", session);
  }

  async listNotifications(
    filter: { userId: ID; status?: TNotificationStatusEnum; startDate?: Date; endDate?: Date },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Notification>> {
    const filterQuery: FilterQuery<Notification> = {
      userId: filter.userId,
    };

    if (filter.status) filterQuery.status = filter.status;

    if (filter.startDate && filter.endDate)
      filterQuery.date = { $gte: filter.startDate, $lte: filter.endDate };

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      sort: { createdAt: -1 },
    });

    return data;
  }

  async getUnseenNotificationsNumberOfUser(userId: string): Promise<number> {
    return (await this.model.find({ userId, status: NOTIFICATION_STATUS_ENUM.UNSEEN })).length;
  }
}
