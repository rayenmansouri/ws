
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../../../core/express/registerRoute";
import { LoginController } from "./login.controller";
import { LoginRouteConfig } from "./login.types";
import { loginValidation } from "./login.validation";

registerRoute<LoginRouteConfig>()(
  {
    path: "/login",
    method: "post",
    bodySchema: loginValidation.body,
    controller: LoginController,
    isTransactionEnabled: false,
    isPublic: true,
    middlewaresClasses:getCoreMiddlewares()
  }
); 