import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { LoginController } from "./login.controller";
import { LoginRouteConfig } from "./login.types";
import { loginValidation } from "./login.validation";

registerRoute<LoginRouteConfig>()({
  path: "/login",
  method: "post",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  platform: "web",
  isPublic: true,
});
