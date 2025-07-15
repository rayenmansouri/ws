import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";

import { ListObservationsByTeacherValidation } from "./listObservationsByTeacher.validation";

export type ListObservationsByTeacherRouteConfig = ListObservationsByTeacherValidation & {
  files: never;
};
export type ListObservationsByTeacherResponse = ResponseWithPagination<ObservationDTO>;
