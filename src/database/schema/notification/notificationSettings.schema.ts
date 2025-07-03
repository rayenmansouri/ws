import mongoose, { ObjectId } from "mongoose";
import { IEntity } from "../../../types/entities";
import { createSchema } from "../../../helpers/createSchema";

interface IRegistrationToken {
  userAgent: string;
  token: string;
}
interface IPreferences {
  homework: boolean;
  observations: boolean;
  schedule: boolean;
  payment: boolean;
  attendance: boolean;
  informations: boolean;
  messages: boolean;
}
export interface INotificationSettings extends IEntity {
  userId: ObjectId;
  registrationTokens: IRegistrationToken[];
  isPushNotificationEnabled: boolean;
  preferences: IPreferences;
}
const registrationTokenSchema = new mongoose.Schema(
  {
    userAgent: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { _id: false },
);
const preferencesSchema = new mongoose.Schema<IPreferences>(
  {
    homework: {
      type: Boolean,
      default: true,
    },
    observations: {
      type: Boolean,
      default: true,
    },
    schedule: {
      type: Boolean,
      default: true,
    },
    payment: {
      type: Boolean,
      default: true,
    },
    attendance: {
      type: Boolean,
      default: true,
    },
    informations: {
      type: Boolean,
      default: true,
    },
    messages: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);
export const notificationSettingsSchema = createSchema<INotificationSettings>({
  userId: { type: mongoose.Types.ObjectId },
  registrationTokens: [{ type: registrationTokenSchema, default: [] }],
  isPushNotificationEnabled: { type: Boolean, default: true },
  preferences: { type: preferencesSchema, default: {} },
});

notificationSettingsSchema.index({ status: 1, userId: 1 });
