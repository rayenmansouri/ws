import { publicRouter } from "../../../../../apps/main/routers/public-router";
import { getTenantAuthenticatedMiddlewares } from "../../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../../core/express/types";
import { LevelsOverviewController } from "./levelsOverview.controller";
import { LevelsOverviewRouteConfig } from "./levelsOverview.types";
import { levelsOverviewRoute as levelsOverviewRouteConfig } from "../../../../../../shared-types/routes/level/web/admin/levelsOverview";

export const levelsOverviewRoute: RouteConfiguration<LevelsOverviewRouteConfig, "/levels/overview"> = {
  path: levelsOverviewRouteConfig.path,
  method: levelsOverviewRouteConfig.method,
  controller: LevelsOverviewController,
  middlewaresClasses: getTenantAuthenticatedMiddlewares(),
  router: publicRouter,
  isPublic: false,
  isTransactionEnabled: false,
  platform: PLATFORM_ENUM.WEB,
  endUser: "admin",
  authorization: { action: "VIEW", resource: "LEVEL" },
};
