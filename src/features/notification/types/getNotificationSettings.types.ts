import { ID } from "../../../types/BaseEntity";
import { TGetAllNotificationSettingsValidation } from "./../validations/getNotificationSettings.validation";
import { IPreferences } from "./interfaces";

export type TGetNotificationSettingsRouteConfig = TGetAllNotificationSettingsValidation;
export type TGetNotificationSettingsResponse = {
  userId: ID;
  isPushNotificationEnabled: boolean;
  preferences: IPreferences;
};
