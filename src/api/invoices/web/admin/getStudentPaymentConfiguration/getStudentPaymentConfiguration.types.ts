import { StudentPaymentConfigurationDto } from "../../../../../feature/invoices/dtos/studentPaymentConfiguration.dto";
import { GetStudentPaymentConfigurationValidation } from "./getStudentPaymentConfiguration.validation";

export type GetStudentPaymentConfigurationRouteConfig = GetStudentPaymentConfigurationValidation & {
  files: never;
};
export type GetStudentPaymentConfigurationResponse = StudentPaymentConfigurationDto;
