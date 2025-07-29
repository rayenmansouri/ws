import { Connection } from "mongoose";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { NotificationSettings } from "../../../feature/notifications/NotificationSettings.entity";
import { MAX_TOKEN_PER_USER } from "../constants/constants";
import { SaveFcmTokenTranslationKeysEnum } from "../constants/saveFcmToken.constants";
import { TSaveFcmTokenResponse } from "../types/saveFcmToken.types";

export const saveFcmTokenService = async (
  connection: Connection,
  userId: string,
  registrationToken: string,
  userAgent: string | undefined,
): Promise<TSaveFcmTokenResponse> => {
  if (!userAgent)
    throw new BadRequestError(SaveFcmTokenTranslationKeysEnum.USER_AGENT_MUST_BE_TRUTHY);
  let notificationSettingsDoc = await connection
    .model<NotificationSettings>("notificationSettings")
    .findOne({
      userId,
    });

  if (!notificationSettingsDoc)
    throw new InternalError(SaveFcmTokenTranslationKeysEnum.NOTIFICATION_SETTING_NOT_FOUND);

  const userAgentIndex = notificationSettingsDoc.registrationTokens.findIndex(
    doc => doc.userAgent === userAgent,
  );

  const doesUserAgentExist = userAgentIndex != -1;
  if (doesUserAgentExist)
    notificationSettingsDoc.registrationTokens[userAgentIndex].token = registrationToken;

  if (!doesUserAgentExist) {
    if (notificationSettingsDoc.registrationTokens.length >= MAX_TOKEN_PER_USER)
      notificationSettingsDoc.registrationTokens.shift();

    notificationSettingsDoc.registrationTokens.push({ userAgent, token: registrationToken });
  }

  notificationSettingsDoc = await connection
    .model<NotificationSettings>("notificationSettings")
    .findOneAndUpdate(
      { userId },
      { registrationTokens: notificationSettingsDoc.registrationTokens },
      { new: true },
    );
  return {
    userId: String(notificationSettingsDoc?.userId),
    registrationToken,
  };
};
