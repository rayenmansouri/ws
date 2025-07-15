import { crudRepo } from "./../../../database/repositories/crud.repo";
import { Connection, ObjectId } from "mongoose";
import { TGetNotificationSettingsResponse } from "../types/getNotificationSettings.types";

export const getNotificationSettingsService = async (
  connection: Connection,
  userId: ObjectId,
): Promise<TGetNotificationSettingsResponse> => {
  const notificationSettings = await crudRepo(connection, "notificationSettings").findOne({
    userId,
  });

  return {
    userId: notificationSettings.userId,
    isPushNotificationEnabled: notificationSettings.isPushNotificationEnabled,
    preferences: notificationSettings.preferences,
  };
};
