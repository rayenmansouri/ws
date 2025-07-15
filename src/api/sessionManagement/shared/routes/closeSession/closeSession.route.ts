import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { CloseSessionController } from "./closeSession.controller";
import { CloseSessionRouteConfig } from "./closeSession.types";
import { closeSessionValidation } from "./closeSession.validation";

registerSharedRoute<CloseSessionRouteConfig>()(
  {
    path: "/close-session/:sessionNewId",
    method: "patch",
    paramSchema: closeSessionValidation.params,
    controller: CloseSessionController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
