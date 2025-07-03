import { Types } from "mongoose";
import { NotificationSettings } from "../../../feature/notifications/NotificationSettings.entity";
import { createMongoSchema } from "../createSchema";

export const mongoNotificationSettingsSchema = createMongoSchema<NotificationSettings>({
  userId: {
    type: Types.ObjectId,
  },
  isPushNotificationEnabled: {
    type: Boolean,
  },
  registrationTokens: [
    {
      token: {
        type: String,
      },
      userAgent: {
        type: String,
      },
    },
  ],
  preferences: {
    attendance: {
      type: Boolean,
    },
    homework: {
      type: Boolean,
    },
    informations: {
      type: Boolean,
    },
    messages: {
      type: Boolean,
    },
    observations: {
      type: Boolean,
    },
    payment: {
      type: Boolean,
    },
    schedule: {
      type: Boolean,
    },
  },
});
