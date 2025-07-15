import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { GetOneObservationValidation } from "./getOneObservation.validation";

export type GetOneObservationRouteConfig = GetOneObservationValidation & { files: never };
export type GetOneObservationResponse = ObservationDTO;
