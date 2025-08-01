
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { LoginController } from "./login.controller";
import { LoginRouteConfig } from "./login.types";
import { loginValidation } from "./login.validation";


export const loginRoute: RouteConfiguration<LoginRouteConfig, "/login"> = {
  path: "/login",
  method: "post",
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses:getCoreMiddlewares()
};
