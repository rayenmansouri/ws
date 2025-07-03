import { FilesInRequest } from "./../../../../../types/app-request";
import { AddTeacherPaymentConfigurationValidation } from "./addTeacherPaymentConfiguration.validation";

export type AddTeacherPaymentConfigurationRouteConfig = AddTeacherPaymentConfigurationValidation & {
  files: FilesInRequest<"attachment">;
};
export type AddTeacherPaymentConfigurationResponse = void;
