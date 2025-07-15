import { ClientSession, Connection } from "mongoose";
import { INotification } from "../../../database/schema/notification/notification.schema";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { NOTIFICATION_STATUS_ENUM, NOTIFICATION_TYPES_ENUM } from "../constants/constants";
import { SendNotificationToUsersTranslationKeysEnum } from "../constants/sendNotificationToUsers.constants";
import { INotificationBase } from "../types/interfaces";
import { TSendNotificationToUsersResponse } from "../types/sendNotificationToUsers.types";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { crudRepo } from "./../../../database/repositories/crud.repo";
import {
  getNotificationSettingsDocs,
  handleFailedRegistrationToken,
  sendNotifications,
} from "./helpers.service";

export const sendNotificationToUsersService = async (
  connection: Connection,
  usersIds: string[],
  userType: TEndUserWithoutMasterEnums,
  notificationSettings: INotificationBase,
  schoolId: string,
  session: ClientSession,
  alertContent: string | null,
): Promise<TSendNotificationToUsersResponse> => {
  const usersDoc = await crudRepo(connection, userType).findMany({ _id: { $in: usersIds } });

  if (usersDoc.length === 0)
    throw new NotFoundError(SendNotificationToUsersTranslationKeysEnum.USER_NOT_FOUND);

  const notificationData = {
    status: NOTIFICATION_STATUS_ENUM.UNSEEN,
    date: getCurrentTimeOfSchool(schoolId),
    topic: NOTIFICATION_TYPES_ENUM.ALERT,
  };

  const notificationsSettingsDocs = await getNotificationSettingsDocs(connection, usersIds);

  const tokens = notificationsSettingsDocs.flatMap(doc =>
    doc.registrationTokens.map(doc => doc.token),
  );

  const payload = {
    tokens,
    notification: notificationSettings,
  };
  const broadcastId = RandomUtils.generateUUID();

  const notificationsPayload: Partial<INotification>[] = usersIds.map(userId => {
    return {
      ...notificationData,
      message: payload.notification.body,
      userId,
      broadcastId,
    };
  });

  await crudRepo(connection, "notification").addMany(notificationsPayload, session);

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
