import { ClientSession, Connection } from "mongoose";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { NotificationSettings } from "../../../feature/notifications/NotificationSettings.entity";
import { BaseUser } from "../../../feature/users/domain/baseUser.entity";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { NOTIFICATION_STATUS_ENUM, NOTIFICATION_TYPES_ENUM } from "../constants/constants";
import { SendNotificationToUsersTranslationKeysEnum } from "../constants/sendNotificationToUsers.constants";
import { INotificationBase } from "../types/interfaces";
import { TSendNotificationToUsersResponse } from "../types/sendNotificationToUsers.types";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { handleFailedRegistrationToken, sendNotifications } from "./helpers.service";
import { Notification } from "../../../feature/notifications/notification.entity";

export const sendNotificationToUsersService = async (
  connection: Connection,
  usersIds: string[],
  userType: TEndUserWithoutMasterEnums,
  notificationSettings: INotificationBase,
  schoolId: string,
  session: ClientSession,
  alertContent: string | null,
): Promise<TSendNotificationToUsersResponse> => {
  const usersDoc = await connection
    .model<BaseUser>(userType)
    .find({ _id: { $in: usersIds } })
    .lean();

  if (usersDoc.length === 0)
    throw new NotFoundError(SendNotificationToUsersTranslationKeysEnum.USER_NOT_FOUND);

  const notificationData = {
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    topic: NOTIFICATION_TYPES_ENUM.ALERT,
  };

  const notificationsSettingsDocs = await connection
    .model<NotificationSettings>("notificationSettings")
    .find({ userId: { $in: usersIds } })
    .lean();
  //await getNotificationSettingsDocs(connection, usersIds);

  const tokens = notificationsSettingsDocs.flatMap(doc =>
    doc.registrationTokens.map(doc => doc.token),
  );

  const payload = {
    tokens,
    notification: notificationSettings,
  };
  const broadcastId = RandomUtils.generateUUID();

  const notificationsPayload: Partial<Notification>[] = usersIds.map<Partial<Notification>>(
    userId => ({
      ...notificationData,
      message: payload.notification.body,
      userId,
      broadcastId,
    }),
  );
  await connection.model<Notification>("notification").create(notificationsPayload, { session });

  const result = await sendNotifications(
    payload,
    {
      topic: NOTIFICATION_TYPES_ENUM.ALERT,
      userType,
      $title: payload.notification.title!,
      $message: payload.notification.body!,
      broadcastId,
    },
    {
      topic: NOTIFICATION_TYPES_ENUM.ALERT,
      details: {
        content: alertContent,
      },
    },
  );

  await handleFailedRegistrationToken(connection, result, payload.tokens);
};
