import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateObservationController } from "./updateObservation.controller";
import { UpdateObservationRouteConfig } from "./updateObservation.types";
import { updateObservationValidation } from "./updateObservation.validation";

registerSharedRoute<UpdateObservationRouteConfig>()(
  {
    path: "/observations/:observationNewId",
    method: "patch",
    bodySchema: updateObservationValidation.body,
    paramSchema: updateObservationValidation.params,
    controller: UpdateObservationController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "files", maxCount: 10 }] },
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
  ],
);
