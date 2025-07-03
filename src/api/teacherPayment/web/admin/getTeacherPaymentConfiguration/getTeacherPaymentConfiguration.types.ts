import { TPaymentTypeEnum } from "../../../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";
import { GetTeacherPaymentConfigurationValidation } from "./getTeacherPaymentConfiguration.validation";

export type GetTeacherPaymentConfigurationRouteConfig = GetTeacherPaymentConfigurationValidation & {
  files: never;
};
export type GetTeacherPaymentConfigurationResponse = {
  contractType: string;
  amount: number;
  attachment: { public_id: string; url: string; name: string }[];
  paymentType: TPaymentTypeEnum;
  bankAccountId: string | null;
};
