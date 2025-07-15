import { NOTIFICATION_STATUS_ENUM } from "../constants/constants";
import { crudRepo } from "./../../../database/repositories/crud.repo";
import { Connection, ObjectId } from "mongoose";
import { TUpdateNotificationStatusResponse } from "../types/updateNotificationStatus.types";

export const updateNotificationStatusService = async (
  connection: Connection,
  userId: ObjectId,
): Promise<TUpdateNotificationStatusResponse> => {
  const updatedNotification = await crudRepo(connection, "notification").updateMany(
    { userId, status: NOTIFICATION_STATUS_ENUM.UNSEEN },
    {
      status: NOTIFICATION_STATUS_ENUM.SEEN,
    },
  );
  return updatedNotification;
};
