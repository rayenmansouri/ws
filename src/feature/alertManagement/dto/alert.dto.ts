import { ID } from "../../../types/BaseEntity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TAlertStatusEnum } from "../constants/alertStatus.constant";

export type AlertDto = {
  _id: ID;
  newId: string;
  content: string;
  totalAlertSent: number;
  status: TAlertStatusEnum;
  createdBy: UserProfileDTO;
  sentAt: Date | null;
  createdAt: Date;
};

export type AlertDetails = {
  _id: ID;
  newId: string;
  sentAt: Date | null;
  createdAt: Date;
  createdBy: UserProfileDTO;
  status: TAlertStatusEnum;
  types: {
    sms: boolean;
    notification: boolean;
  };
  content: string;
  users: { _id: ID; newId: string; phoneNumber: string | null; fullName: string; avatar: string }[];
};

export type SmsSoldHistoryResponseDto = {
  _id: ID;
  master: UserProfileDTO;
  smsCount: number;
  operation: "plus" | "minus";
  operationIssuedAt: Date;
};
