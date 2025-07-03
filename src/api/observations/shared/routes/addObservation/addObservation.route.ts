import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddObservationController } from "./addObservation.controller";
import { AddObservationRouteConfig } from "./addObservation.types";
import { addObservationValidation } from "./addObservation.validation";

registerSharedRoute<AddObservationRouteConfig>()(
  {
    path: "/observations",
    method: "post",
    bodySchema: addObservationValidation.body,
    controller: AddObservationController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "files", maxCount: 10 }] },
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
  ],
);
