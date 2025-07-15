import { GetOnePreRegistrationValidation } from "./getOnePreRegistration.validation";
import { PublicPreRegistrationDTO } from "../../../../../feature/preRegistration/dtos/PublicPreRegistration.dto";

export type GetOnePreRegistrationRouteConfig = GetOnePreRegistrationValidation & { files: never };
export type GetOnePreRegistrationResponse = PublicPreRegistrationDTO;
