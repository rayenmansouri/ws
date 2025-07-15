import { ClientSession, Connection, FilterQuery } from "mongoose";
import { crudRepo } from "../../../database/repositories/crud.repo";
import {
  INotification,
  notificationTopicMap,
} from "../../../database/schema/notification/notification.schema";
import { NOTIFICATION_TYPES_ENUM } from "../constants/constants";

export const deleteNotificationsByTopic = async <T extends keyof notificationTopicMap>(
  connection: Connection,
  topicType: T,
  details: OmitStudentNewId<notificationTopicMap[T]>,
  session?: ClientSession,
) => {
  const notificationFilter: FilterQuery<INotification> = { topic: topicType };

  Object.entries(details).forEach(([key, value]) => {
    const notificationDetailKey = `details.${key}`;
    notificationFilter[notificationDetailKey] = Array.isArray(value) ? { $in: value } : value;
  });

  await crudRepo(connection, "notification").hardDeleteMany(notificationFilter, session);
};

type OmitStudentNewId<T> = T extends { details: infer D }
  ? { [K in keyof Omit<D, "studentNewId">]: string | string[] }
  : never;

export const deleteNotificationsOfSession = async (
  connection: Connection,
  sessionNewIds: string[],
  homeworkNewIds: string[],
  session: ClientSession,
) => {
  const notificationFilter: FilterQuery<INotification> = {
    topic: {
      $in: [
        NOTIFICATION_TYPES_ENUM.ATTENDANCE,
        NOTIFICATION_TYPES_ENUM.ATTENDANCE_EXPELLED,
        NOTIFICATION_TYPES_ENUM.ATTENDANCE_ABSENT,
        NOTIFICATION_TYPES_ENUM.ATTENDANCE_LATE,
        NOTIFICATION_TYPES_ENUM.SCHEDULE,
        NOTIFICATION_TYPES_ENUM.SESSION_NOTES,
        NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
        NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
      ],
    },
    $or: [
      { "details.sessionNewId": { $in: sessionNewIds } },
      { "details.homeworkNewId": { $in: homeworkNewIds } },
    ],
  };

  await crudRepo(connection, "notification").hardDeleteMany(notificationFilter, session);
};
