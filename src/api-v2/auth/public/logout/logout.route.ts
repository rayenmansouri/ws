import { publicRouter } from "../../../../apps/main/routers/public-router";
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { LogoutController } from "./logout.controller";
import { LogoutRouteConfig } from "./logout.types";
import { logoutValidation } from "./logout.validation";

export const logoutRoute: RouteConfiguration<LogoutRouteConfig, "/logout"> = {
  path: "/logout",
  method: "post",
  controller: LogoutController,
  isTransactionEnabled: false,
  isPublic: true,
  endUser: "admin",
  bodySchema: logoutValidation.body,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getCoreMiddlewares(),
  router: publicRouter
};
