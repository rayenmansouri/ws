import { publicRouter } from "../../../../../apps/main/routers/public-router";
import { getTenantAuthenticatedMiddlewares } from "../../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../../core/express/types";
import { LevelsOverviewController } from "./levelsOverview.controller";
import { LevelsOverviewRouteConfig } from "./levelsOverview.types";

export const levelsOverviewRoute: RouteConfiguration<LevelsOverviewRouteConfig, "/levels/overview"> = {
  path: "/levels/overview",
  method: "get",
  controller: LevelsOverviewController,
  middlewaresClasses: getTenantAuthenticatedMiddlewares(),
  router: publicRouter,
  isPublic: false,
  isTransactionEnabled: false,
  platform: PLATFORM_ENUM.WEB,
  endUser: "admin",
  authorization: { action: "VIEW", resource: "LEVEL" },
};
