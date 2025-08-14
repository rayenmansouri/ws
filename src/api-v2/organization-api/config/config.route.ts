import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { getCoreMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { ConfigController } from "./config.controller";
import { configParamValidation, getConfigRouteType } from "./config-route.type";
import { publicRouter } from "../../../apps/main/routers/public-router";

export const configRoute: RouteConfiguration<getConfigRouteType, "/organizations/:organizationId/config"> = {
    path: "/organizations/:organizationId/config",
    method: "get",
    isPublic: true,
    paramSchema: configParamValidation,
    controller: ConfigController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses:getCoreMiddlewares(),
    router: publicRouter
};