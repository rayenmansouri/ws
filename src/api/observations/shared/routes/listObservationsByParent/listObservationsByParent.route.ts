import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { ListObservationsByParentController } from "./listObservationsByParent.controller";
import { ListObservationsByParentRouteConfig } from "./listObservationsByParent.types";
import { listObservationsByParentValidation } from "./listObservationsByParent.validation";

registerSharedRoute<ListObservationsByParentRouteConfig>()(
  {
    path: "/observations",
    method: "get",
    querySchema: listObservationsByParentValidation.query,
    controller: ListObservationsByParentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["mobile", "web"],
    },
  ],
);
