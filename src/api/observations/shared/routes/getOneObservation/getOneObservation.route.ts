import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneObservationController } from "./getOneObservation.controller";
import { GetOneObservationRouteConfig } from "./getOneObservation.types";
import { getOneObservationValidation } from "./getOneObservation.validation";

registerSharedRoute<GetOneObservationRouteConfig>()(
  {
    path: "/observations/:observationNewId",
    method: "get",
    paramSchema: getOneObservationValidation.params,
    controller: GetOneObservationController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
