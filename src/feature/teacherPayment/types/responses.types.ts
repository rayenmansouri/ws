import { TSessionStatusEnum } from "./../../../database/schema/pedagogy/session/session.schema";
import { TTransactionAdjustmentTypeEnum } from "./../domain/teacherPaymentConfiguration.entity";
import { ID } from "./../../../types/BaseEntity";
import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";
import { TPaymentTypeEnum } from "./../domain/teacherPaymentConfiguration.entity";

export type transactionAdjustmentResponse = {
  _id?: ID;
  name: string;
  amount: number;
  type: TTransactionAdjustmentTypeEnum;
  insertedAt: Date;
  teacherPaymentId: ID;
  paidBy: UserProfileDTO;
};

export type ConfiguredTeacherPaymentDashboardResponse = {
  paymentInformation: { finalAmount: number; hasPaid: boolean };
  isPaymentConfigured: true;
  teacherInformation: {
    paymentType: TPaymentTypeEnum;
    amount: number;
    bankAccountId: string | null;
    subject: string;
  } & UserProfileDTO;
  transactions: transactionAdjustmentResponse[];
  hourDistribution: {
    tag: TSessionStatusEnum;
    percentage: number;
  }[];
};

export type NotConfiguredTeacherPaymentResponse = {
  isPaymentConfigured: false;
  teacherInformation: {
    subject: string | null;
  } & UserProfileDTO;
};

export type getTeacherPaymentDashboardResponse =
  | ConfiguredTeacherPaymentDashboardResponse
  | NotConfiguredTeacherPaymentResponse;
