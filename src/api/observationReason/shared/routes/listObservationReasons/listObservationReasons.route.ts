import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListObservationReasonsController } from "./listObservationReasons.controller";
import { ListObservationReasonsRouteConfig } from "./listObservationReasons.types";
import { listObservationReasonsValidation } from "./listObservationReasons.validation";

registerSharedRoute<ListObservationReasonsRouteConfig>()(
  {
    path: "/observations-reasons",
    method: "get",
    querySchema: listObservationReasonsValidation.query,
    controller: ListObservationReasonsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web"],
    },
  ],
);
