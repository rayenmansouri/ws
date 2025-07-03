import { UpdatePreRegistrationValidation } from "./updatePreRegistration.validation";
import { FilesInRequest } from "../../../../../types/app-request";
import { ID } from "../../../../../types/BaseEntity";

export type UpdatePreRegistrationRouteConfig = UpdatePreRegistrationValidation & {
  files: FilesInRequest<"birthCertificate" | "previousTranscripts">;
};
export type UpdatePreRegistrationResponse = ID;
