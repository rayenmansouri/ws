import { Admin } from "./../../admins/domain/admin.entity";
import { BaseUser } from "./../../users/domain/baseUser.entity";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type Alert = {
  types: {
    notification: boolean;
    sms: boolean;
  };
  content: string;
  users: { userId: ID; userType: TEndUserEnum }[];
  status: "draft" | "scheduled" | "sent";
  scheduledAt: Date | null;
  sentAt: Date | null;
  createdBy: ID;
} & BaseEntity;

export type AlertMetaData = GenerateMetaData<
  Alert,
  {
    "users.userId": BaseUser;
    createdBy: Admin;
  }
>;
