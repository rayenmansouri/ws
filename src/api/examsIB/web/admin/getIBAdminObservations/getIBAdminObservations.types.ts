import { IBAdminObservationsDTO } from "../../../../../feature/examGrade/dto/ib/IBAdminObservations.dto";
import { GetIBAdminObservationsValidation } from "./getIBAdminObservations.validation";

export type GetIBAdminObservationsRouteConfig = GetIBAdminObservationsValidation & { files: never };
export type GetIBAdminObservationsResponse = IBAdminObservationsDTO;
