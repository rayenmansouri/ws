
import { getAuthenticatedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { MeController } from "./me.controller";
import { MeRouteConfig } from "./me.types";
import { adminRouter } from "../../../apps/main/routers/admin-router";
import { masterRouter } from "../../../apps/main/routers/master-router";
import { participantRouter } from "../../../apps/main/routers/participant-router";
import { coachRouter } from "../../../apps/main/routers/coach-router";

export const adminMeRoute: RouteConfiguration<MeRouteConfig, "/me"> = {
  path: "/me",
  method: "get",
  controller: MeController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: adminRouter
};


export const masteMeRoute: RouteConfiguration<MeRouteConfig, "/me"> = {
  path: "/me",
  method: "get",
  controller: MeController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: masterRouter
};

export const participantMeRoute: RouteConfiguration<MeRouteConfig, "/me"> = { 
  path: "/me",
  method: "get",
  controller: MeController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: participantRouter
};


export const coachMeRoute: RouteConfiguration<MeRouteConfig, "/me"> = { 
  path: "/me",
  method: "get",
  controller: MeController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: coachRouter
};