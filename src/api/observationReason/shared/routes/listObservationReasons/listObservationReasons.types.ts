import { ObservationReasonDTO } from "../../../../../feature/observations/dtos/observationReason.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListObservationReasonsValidation } from "./listObservationReasons.validation";

export type ListObservationReasonsRouteConfig = ListObservationReasonsValidation & { files: never };
export type ListObservationReasonsResponse = ResponseWithPagination<ObservationReasonDTO>;
