import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { getCoreMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { ConfigController } from "./config.controller";
import { configParamValidation, getConfigRouteType } from "./config-route.type";
import { publicRouter } from "../../../apps/main/routers/public-router";
import { configRoute as configRouteConfig } from "../../../../shared-types/routes/organization-api/config";

export const configRoute: RouteConfiguration<getConfigRouteType, "/organizations/:organizationId/config"> = {
    path: configRouteConfig.path,
    method: configRouteConfig.method,
    isPublic: true,
    paramSchema: configParamValidation,
    controller: ConfigController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses:getCoreMiddlewares(),
    router: publicRouter
};