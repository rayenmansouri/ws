
import { adminRouter } from "../../../../apps/main/routers/admin-router";
import { coachRouter } from "../../../../apps/main/routers/coach-router";
import { masterRouter } from "../../../../apps/main/routers/master-router";
import { participantRouter } from "../../../../apps/main/routers/participant-router";
import { getCoreMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { LoginController } from "./login.controller";
import { LoginRouteConfig } from "./login.types";
import { loginValidation } from "./login.validation";


export const adminLoginRoute: RouteConfiguration<LoginRouteConfig, "/login"> = {
  path: "/login",
  method: "post",
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses:getCoreMiddlewares(),
  router: adminRouter
};


export const masterLoginRoute: RouteConfiguration<LoginRouteConfig, "/login"> = {
  path: "/login",
  method: "post",
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses:getCoreMiddlewares(),
  router: masterRouter
};


export const participantLoginRoute: RouteConfiguration<LoginRouteConfig, "/login"> = {
  path: "/login",
  method: "post",
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses:getCoreMiddlewares(),
  router: participantRouter
};


export const coachLoginRoute: RouteConfiguration<LoginRouteConfig, "/login"> = {
  path: "/login",
  method: "post",
  bodySchema: loginValidation.body,
  controller: LoginController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses:getCoreMiddlewares(),
  router: coachRouter
};