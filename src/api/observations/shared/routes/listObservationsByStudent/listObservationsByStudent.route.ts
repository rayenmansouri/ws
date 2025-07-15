import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListObservationsByStudentController } from "./listObservationsByStudent.controller";
import { ListObservationsByStudentRouteConfig } from "./listObservationsByStudent.types";
import { listObservationsByStudentValidation } from "./listObservationsByStudent.validation";

registerSharedRoute<ListObservationsByStudentRouteConfig>()(
  {
    path: "/observations",
    method: "get",
    querySchema: listObservationsByStudentValidation.query,
    controller: ListObservationsByStudentController,
  },
  [{ endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] }],
);
