import { ValidateSchemaMiddleware } from "./validateSchema";
import { MulterMiddleware } from "./upload";
import { LoggingMiddleware } from "./LoggingMiddleware";
import { RouteConfiguration, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { AuthMiddleware } from "./auth";
import { GetTenantConnectionMiddleware } from "./getTenantConnection";


//order is just does MATTER
export function getCoreMiddlewares(): (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] {
   return [
    ValidateSchemaMiddleware,
    MulterMiddleware,
    LoggingMiddleware,
   ]
}

export function getAuthenticatedMiddlewares(): (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] {
  return [
   ...getCoreMiddlewares(),
   AuthMiddleware
  ]
}

export function getTenantAuthenticatedMiddlewares(): (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] {
  return [
    ...getCoreMiddlewares(),
    AuthMiddleware,
    GetTenantConnectionMiddleware,
  ]
}