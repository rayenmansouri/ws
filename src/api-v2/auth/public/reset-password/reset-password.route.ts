import { publicRouter } from "../../../../apps/main/routers/public-router";
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { ResetPasswordController } from "./reset-password.controller";
import { ResetPasswordRouteConfig } from "./reset-password.types";
import { resetPasswordValidation } from "./reset-password.validation";


export const resetPasswordRoute: RouteConfiguration<ResetPasswordRouteConfig, "/reset-password"> = {
    path: "/reset-password",
    method: "post",
    controller: ResetPasswordController,
    isTransactionEnabled: false,
    isPublic: true,
    endUser: "admin",
    bodySchema: resetPasswordValidation.body,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses: getCoreMiddlewares(),
    router: publicRouter
  };