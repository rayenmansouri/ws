import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Teacher } from "../../teachers/domain/teacher.entity";

export const PAYMENT_TYPE_ENUM = {
  HOURLY: "hourly",
  SALARY: "salary",
} as const;
export type TPaymentTypeEnum = (typeof PAYMENT_TYPE_ENUM)[keyof typeof PAYMENT_TYPE_ENUM];

export const TRANSACTION_ADJUSTMENT_TYPE_ENUM = {
  PENALTY: "penalty",
  BONUS: "bonus",
} as const;
export type TTransactionAdjustmentTypeEnum =
  (typeof TRANSACTION_ADJUSTMENT_TYPE_ENUM)[keyof typeof TRANSACTION_ADJUSTMENT_TYPE_ENUM];

export type TeacherPaymentConfiguration = {
  paymentType: TPaymentTypeEnum;
  contractType: string;
  attachment: { public_id: string; url: string; name: string }[];
  bankAccountId: string | null;
  teacher: ID;
  amount: number;
} & BaseEntity;

export type TeacherPaymentConfigurationMetaData = GenerateMetaData<
  TeacherPaymentConfiguration,
  {
    teacher: Teacher;
  }
>;
