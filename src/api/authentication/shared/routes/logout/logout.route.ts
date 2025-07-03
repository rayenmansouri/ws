import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { LogoutController } from "./logout.controller";
import { LogoutRouteConfig } from "./logout.types";
import { logoutValidation } from "./logout.validation";

registerSharedRoute<LogoutRouteConfig>()(
  {
    path: "/logout",
    method: "patch",
    bodySchema: logoutValidation.body,
    controller: LogoutController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.MASTER, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
  ],
);
