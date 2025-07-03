import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListObservationsByParentValidation } from "./listObservationsByParent.validation";

export type ListObservationsByParentRouteConfig = ListObservationsByParentValidation & {
  files: never;
};
export type ListObservationsByParentResponse = ResponseWithPagination<ObservationDTO>;
