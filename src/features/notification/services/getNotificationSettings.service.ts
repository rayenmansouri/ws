import { Connection, ObjectId } from "mongoose";
import { NotificationSettings } from "../../../feature/notifications/NotificationSettings.entity";
import { TGetNotificationSettingsResponse } from "../types/getNotificationSettings.types";
import { NotFoundError } from "../../../core/ApplicationErrors";

export const getNotificationSettingsService = async (
  connection: Connection,
  userId: ObjectId,
): Promise<TGetNotificationSettingsResponse> => {
  const notificationSettings = await connection
    .model<NotificationSettings>("notificationSettings")
    .findOne({ userId })
    .lean();

  if (!notificationSettings) throw new NotFoundError("Notification settings not found");

  // await crudRepo(connection, "notificationSettings").findOne({
  //   userId,
  // });

  return {
    userId: notificationSettings.userId,
    isPushNotificationEnabled: notificationSettings.isPushNotificationEnabled,
    preferences: notificationSettings.preferences,
  };
};
