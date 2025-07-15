import { GenerateMetaData } from "../../core/populateTypes";
import { ID, BaseEntity } from "../../types/BaseEntity";
import { Parent } from "../parents/domain/parent.entity";
import { Student } from "../students/domain/student.entity";

export type NotificationSettings = {
  userId: ID;
  registrationTokens: {
    userAgent: string;
    token: string;
  }[];
  isPushNotificationEnabled: boolean;
  preferences: {
    homework: boolean;
    observations: boolean;
    schedule: boolean;
    payment: boolean;
    attendance: boolean;
    informations: boolean;
    messages: boolean;
  };
} & BaseEntity;

export type NotificationSettingsMetaData = GenerateMetaData<
  NotificationSettings,
  {
    userId: Student | Parent;
  }
>;
