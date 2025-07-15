import { ClientSession, Connection, ObjectId } from "mongoose";
import { crudRepo } from "../../../database/repositories/crud.repo";

export const deleteUserNotifications = async (
  connection: Connection,
  userIds: ObjectId[],
  session: ClientSession,
) => {
  const notification = crudRepo(connection, "notification").hardDeleteMany(
    { userId: { $in: userIds } },
    session,
  );
  const notificationSettings = crudRepo(connection, "notificationSettings").hardDeleteMany(
    { userId: { $in: userIds } },
    session,
  );

  return await Promise.all([notification, notificationSettings]);
};
