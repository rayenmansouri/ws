import { PreRegistrationDTO } from "../../../../../feature/preRegistration/dtos/PreRegistration.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListPreRegistrationValidation } from "./listPreRegistration.validation";

export type ListPreRegistrationRouteConfig = ListPreRegistrationValidation & { files: never };
export type ListPreRegistrationResponse = ResponseWithPagination<PreRegistrationDTO>;
