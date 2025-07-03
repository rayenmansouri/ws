import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListObservationsByStudentValidation } from "./listObservationsByStudent.validation";

export type ListObservationsByStudentRouteConfig = ListObservationsByStudentValidation & {
  files: never;
};
export type ListObservationsByStudentResponse = ResponseWithPagination<ObservationDTO>;
