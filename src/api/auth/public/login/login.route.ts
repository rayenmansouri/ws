import { LoggingMiddleware } from "../../../../core/express/middlewares/LoggingMiddleware";
import { MulterMiddleware } from "../../../../core/express/middlewares/upload";
import { ValidateSchemaMiddleware } from "../../../../core/express/middlewares/validateSchema";
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
    middlewaresClasses: [
        ValidateSchemaMiddleware,
        MulterMiddleware,
        LoggingMiddleware,
       ]
  }
); 