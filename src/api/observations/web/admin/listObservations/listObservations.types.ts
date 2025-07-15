import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListObservationsValidation } from "./listObservations.validation";

export type ListObservationsRouteConfig = ListObservationsValidation & { files: never };
export type ListObservationsResponse = ResponseWithPagination<ObservationDTO>;
