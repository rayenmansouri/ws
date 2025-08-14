import { publicRouter } from "../../apps/main/routers/public-router";
import { getTenantAuthenticatedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../core/express/types";
import { DashboardController } from "./dashboard.controller";
import { GetDashboardRouteConfig } from "./dashboard.types";
import { getDashboardValidation } from "./dashboard.validation";

export const dashboardRoute: RouteConfiguration<GetDashboardRouteConfig, "/dashboard"> = {
    path: "/dashboard",
    method: "get",
    controller: DashboardController,
    middlewaresClasses: getTenantAuthenticatedMiddlewares(),
    router: publicRouter,
    isPublic: false,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    endUser: "admin",
    querySchema: getDashboardValidation.query,
};