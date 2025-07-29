import { ClientSession, Connection } from "mongoose";
import { UpdateNotificationSettingsTranslationKeysEnum } from "../constants/updateNotificationSettings.constants";
import { TUpdateNotificationSettingsResponse } from "../types/updateNotificationSettings.types";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TUpdateNotificationSettingsValidation } from "./../validations/updateNotificationSettings.validation";
import { NotificationSettingsRepo } from "../../../feature/notifications/NotificationSettings.repo";

export const updateNotificationSettingsService = async (
  connection: Connection,
  userId: string,
  payload: TUpdateNotificationSettingsValidation["body"],
  session: ClientSession,
  userAgent: string | undefined,
): Promise<TUpdateNotificationSettingsResponse> => {
  if (!userAgent)
    throw new BadRequestError(
      UpdateNotificationSettingsTranslationKeysEnum.USER_AGENT_MUST_BE_PROVIDED,
    );

  const crudRepo = (connection: Connection) => {
    return connection.model<NotificationSettingsRepo>("notificationSettings");
  };
  const notificationSettingsDoc = await crudRepo(connection)
    .findOne({
      userId,
    })
    .lean();

  if (!notificationSettingsDoc) throw new BadRequestError("notFound.notification");

  if (payload.isPushNotificationEnabled === false) {
    return crudRepo(connection)
      .updateOne({ userId }, { ...payload, $pull: { registrationTokens: { userAgent } } }, session)
      .lean();
  }

  return await crudRepo(connection)
    .updateOne({ _id: notificationSettingsDoc._id.toString() }, { ...payload }, session)
    .lean();
};
