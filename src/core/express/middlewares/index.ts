import { AuthorizeMiddleware } from "./authorize";
import { GetTenantConnectionMiddleware } from "./getTenantConnection";
import { HandleRequestMiddleware } from "./handle-request.middleware";
import { IMiddlewareFunction } from "./interface";
import { MasterAuthenticationMiddleware } from "./master.auth";
import { MulterMiddleware } from "./upload";
import { ValidateSchemaMiddleware } from "./validateSchema";
import { RouteConfiguration, TypedRequestOptions } from "../types";

export const allMiddlewares: (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] = [
  GetTenantConnectionMiddleware,
  MasterAuthenticationMiddleware,
  AuthorizeMiddleware,
  HandleRequestMiddleware,
  ValidateSchemaMiddleware,
  MulterMiddleware,
];