import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { LoginController } from "./login.controller";
import { LoginRouteConfig } from "./login.types";
import { loginValidation } from "./login.validation";

registerSharedRoute<LoginRouteConfig>()(
  {
    path: "/login",
    method: "post",
    bodySchema: loginValidation.body,
    controller: LoginController,
    isTransactionEnabled: false,
    isPublic: true,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
