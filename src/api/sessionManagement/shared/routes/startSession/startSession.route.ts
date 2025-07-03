import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { StartSessionController } from "./startSession.controller";
import { StartSessionRouteConfig } from "./startSession.types";
import { startSessionValidation } from "./startSession.validation";

registerSharedRoute<StartSessionRouteConfig>()(
  {
    path: "/start-session/:sessionNewId",
    method: "patch",
    paramSchema: startSessionValidation.params,
    controller: StartSessionController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
