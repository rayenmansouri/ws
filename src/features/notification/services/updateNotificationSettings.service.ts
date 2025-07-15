import { ClientSession, Connection } from "mongoose";
import { UpdateNotificationSettingsTranslationKeysEnum } from "../constants/updateNotificationSettings.constants";
import { TUpdateNotificationSettingsResponse } from "../types/updateNotificationSettings.types";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { crudRepo } from "./../../../database/repositories/crud.repo";
import { TUpdateNotificationSettingsValidation } from "./../validations/updateNotificationSettings.validation";

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

  const notificationSettingsDoc = await crudRepo(connection, "notificationSettings").findOne({
    userId,
  });

  if (payload.isPushNotificationEnabled === false) {
    return crudRepo(connection, "notificationSettings").updateOne(
      { userId },
      { ...payload, $pull: { registrationTokens: { userAgent } } },
      session,
    );
  }

  return await crudRepo(connection, "notificationSettings").updateOne(
    { _id: notificationSettingsDoc._id.toString() },
    { ...payload },
    session,
  );
};
