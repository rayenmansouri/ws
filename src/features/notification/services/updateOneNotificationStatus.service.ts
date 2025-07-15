import { Connection, ObjectId } from "mongoose";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { crudRepo } from "../../../database/repositories/crud.repo";
import { NOTIFICATION_STATUS_ENUM } from "../constants/constants";
import { TUpdateOneNotificationStatusResponse } from "../types/updateOneNotificationStatus.types";

export const updateOneNotificationStatusService = async (
  connection: Connection,
  userId: ObjectId,
  broadcastId: string,
): Promise<TUpdateOneNotificationStatusResponse> => {
  const updatedNotification = await crudRepo(connection, "notification").updateOne(
    { userId, broadcastId },
    { status: NOTIFICATION_STATUS_ENUM.SEEN },
  );

  if (!updatedNotification) throw new NotFoundError("notFound.notification");

  return updatedNotification;
};
