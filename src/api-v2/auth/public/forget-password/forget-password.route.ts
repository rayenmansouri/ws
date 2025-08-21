import { publicRouter } from "../../../../apps/main/routers/public-router";
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { ForgetPasswordController } from "./forget-password.controller";
import { ForgetPasswordRouteConfig } from "./forget-password.types";
import { forgetPasswordValidation } from "./forget-password.validation";
import { forgetPasswordRoute as forgetPasswordRouteConfig } from "../../../../../shared-types/routes/auth/public/forget-password";

export const forgetPasswordRoute: RouteConfiguration<ForgetPasswordRouteConfig, "/forget-password"> = {
  path: forgetPasswordRouteConfig.path,
  method: forgetPasswordRouteConfig.method,
  controller: ForgetPasswordController,
  isTransactionEnabled: false,
  isPublic: true,
  endUser: "admin",
  bodySchema: forgetPasswordValidation.body,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getCoreMiddlewares(),
  router: publicRouter
};