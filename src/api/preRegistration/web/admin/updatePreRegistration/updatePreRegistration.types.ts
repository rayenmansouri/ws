import { FilesInRequest } from "../../../../../types/app-request";
import { UpdatePreRegistrationValidation } from "./updatePreRegistration.validation";

export type UpdatePreRegistrationRouteConfig = UpdatePreRegistrationValidation & {
  files: FilesInRequest<"birthCertificate" | "previousTranscripts">;
};
export type UpdatePreRegistrationResponse = void;
