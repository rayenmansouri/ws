import { adminRouter } from "../../apps/main/routers/admin-router";
import { getTenantAuthenticatedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../core/express/types";
import { DashboardController } from "./dashboard.controller";
import { GetDashboardRouteConfig } from "./dashboard.types";
import { getDashboardValidation } from "./dashboard.validation";
import { dashboardRoute as dashboardRouteConfig } from "../../../shared-types/routes/dashboard";

export const dashboardRoute: RouteConfiguration<GetDashboardRouteConfig, "/dashboard"> = {
    path: dashboardRouteConfig.path,
    method: dashboardRouteConfig.method,
    controller: DashboardController,
    middlewaresClasses: getTenantAuthenticatedMiddlewares(),
    router: adminRouter,
    isPublic: false,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    endUser: "admin",
    querySchema: getDashboardValidation.query,
};