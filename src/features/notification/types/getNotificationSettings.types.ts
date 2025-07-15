import { ObjectId } from "mongoose";
import { IPreferences } from "./interfaces";
import { TGetAllNotificationSettingsValidation } from "./../validations/getNotificationSettings.validation";
export type TGetNotificationSettingsRouteConfig = TGetAllNotificationSettingsValidation;
export type TGetNotificationSettingsResponse = {
  userId: ObjectId;
  isPushNotificationEnabled: boolean;
  preferences: IPreferences;
};
