import { DeletePreRegistrationValidation } from "./deletePreRegistration.validation";

export type DeletePreRegistrationRouteConfig = DeletePreRegistrationValidation & { files: never };
export type DeletePreRegistrationResponse = void;
