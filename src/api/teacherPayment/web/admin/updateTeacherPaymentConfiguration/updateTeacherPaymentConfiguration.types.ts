import { FilesInRequest } from "./../../../../../types/app-request";

import { UpdateTeacherPaymentConfigurationValidation } from "./updateTeacherPaymentConfiguration.validation";

export type UpdateTeacherPaymentConfigurationRouteConfig =
  UpdateTeacherPaymentConfigurationValidation & { files: FilesInRequest<"attachment"> };
export type UpdateTeacherPaymentConfigurationResponse = void;
