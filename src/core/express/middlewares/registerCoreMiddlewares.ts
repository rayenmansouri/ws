import { ValidateSchemaMiddleware } from "./validateSchema";
import { MulterMiddleware } from "./upload";
import { LoggingMiddleware } from "./LoggingMiddleware";
import { RouteConfiguration, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";


//order is just does matter
export function getCoreMiddlewares(): (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] {
   return [
    ValidateSchemaMiddleware,
    MulterMiddleware,
    LoggingMiddleware,
   ]
} 