import { Schema } from "mongoose";
import { Notification } from "../../../feature/notifications/notification.entity";
import { createMongoSchema } from "../createSchema";

export const mongoNotificationSchema = createMongoSchema<Notification>({
  userId: String,
  userType: String,
  message: String,
  status: String,
  topic: String,
  date: Date,
  dynamicFieldValues: Schema.Types.Mixed,
  details: Schema.Types.Mixed,
  broadcastId: String,
});
