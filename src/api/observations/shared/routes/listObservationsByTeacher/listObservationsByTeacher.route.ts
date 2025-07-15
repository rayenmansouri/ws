import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListObservationsByTeacherController } from "./listObservationsByTeacher.controller";
import { ListObservationsByTeacherRouteConfig } from "./listObservationsByTeacher.types";
import { listObservationsByTeacherValidation } from "./listObservationsByTeacher.validation";

registerSharedRoute<ListObservationsByTeacherRouteConfig>()(
  {
    path: "/observations",
    method: "get",
    querySchema: listObservationsByTeacherValidation.query,
    controller: ListObservationsByTeacherController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
