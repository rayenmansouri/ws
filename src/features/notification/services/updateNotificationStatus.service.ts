import { Connection, ObjectId } from "mongoose";
import { NOTIFICATION_STATUS_ENUM } from "../constants/constants";
import { TUpdateNotificationStatusResponse } from "../types/updateNotificationStatus.types";

export const updateNotificationStatusService = async (
  connection: Connection,
  userId: ObjectId,
): Promise<TUpdateNotificationStatusResponse> => {
  const updatedNotification = await connection
    .model<Notification>("notification")
    .updateMany(
      { userId, status: NOTIFICATION_STATUS_ENUM.UNSEEN },
      { status: NOTIFICATION_STATUS_ENUM.SEEN },
      { new: true },
    )
    .lean();

  return updatedNotification as unknown as Notification[]; // Assuming the return type is an array of notifications
};
