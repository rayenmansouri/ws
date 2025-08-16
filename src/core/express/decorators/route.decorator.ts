import "reflect-metadata";
import { TPlatformEnum, RouteConfiguration, TypedRequestOptions } from "../types";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { ZodTypeAny } from "zod";
import { IMiddlewareFunction } from "../middlewares/interface";

/**
 * Metadata keys for route configuration
 */
export const ROUTE_METADATA = {
  PATH: 'path',
  METHOD: 'method',
  MIDDLEWARES: 'middlewares',
  PLATFORM: 'platform',
  END_USER: 'endUser',
  AUTHORIZATION: 'authorization',
  IS_PUBLIC: 'isPublic',
  TRANSACTION: 'isTransactionEnabled',
  BODY_SCHEMA: 'bodySchema',
  PARAM_SCHEMA: 'paramSchema',
  QUERY_SCHEMA: 'querySchema',
} as const;

/**
 * Route decorator options
 */
export interface RouteDecoratorOptions {
  platform?: TPlatformEnum;
  endUser?: TEndUserEnum;
  authorization?: {
    action: TActionsEnum;
    resource: TResourcesEnum;
  };
  isPublic?: boolean;
  isTransactionEnabled?: boolean;
  middlewares?: (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[];
  bodySchema?: ZodTypeAny;
  paramSchema?: ZodTypeAny;
  querySchema?: ZodTypeAny;
}

/**
 * Base route decorator factory
 */
function createRouteDecorator(method: string) {
  return function (path: string, options: RouteDecoratorOptions = {}) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      // Store route metadata
      Reflect.defineMetadata(ROUTE_METADATA.PATH, path, target, propertyKey);
      Reflect.defineMetadata(ROUTE_METADATA.METHOD, method, target, propertyKey);
      
      // Store options metadata
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          const metadataKey = ROUTE_METADATA[key.toUpperCase() as keyof typeof ROUTE_METADATA];
          if (metadataKey) {
            Reflect.defineMetadata(metadataKey, value, target, propertyKey);
          }
        }
      });

      return descriptor;
    };
  };
}

/**
 * HTTP method decorators
 */
export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Patch = createRouteDecorator('patch');
export const Delete = createRouteDecorator('delete');

/**
 * Middleware decorator
 */
export function UseMiddleware(...middlewares: (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const existingMiddlewares = Reflect.getMetadata(ROUTE_METADATA.MIDDLEWARES, target, propertyKey) || [];
    Reflect.defineMetadata(ROUTE_METADATA.MIDDLEWARES, [...existingMiddlewares, ...middlewares], target, propertyKey);
    return descriptor;
  };
}

/**
 * Authorization decorator
 */
export function RequireAuth(action: TActionsEnum, resource: TResourcesEnum) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_METADATA.AUTHORIZATION, { action, resource }, target, propertyKey);
    return descriptor;
  };
}

/**
 * Public route decorator
 */
export function Public() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_METADATA.IS_PUBLIC, true, target, propertyKey);
    return descriptor;
  };
}

/**
 * Transaction decorator
 */
export function UseTransaction() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_METADATA.TRANSACTION, true, target, propertyKey);
    return descriptor;
  };
}

/**
 * Platform decorator
 */
export function Platform(platform: TPlatformEnum) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_METADATA.PLATFORM, platform, target, propertyKey);
    return descriptor;
  };
}

/**
 * End user decorator
 */
export function EndUser(endUser: TEndUserEnum) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_METADATA.END_USER, endUser, target, propertyKey);
    return descriptor;
  };
}

/**
 * Extract route configuration from decorated method
 */
export function extractRouteConfig(
  target: any, 
  propertyKey: string, 
  controller: new (...args: any[]) => any
): RouteConfiguration<TypedRequestOptions, string> | null {
  const path = Reflect.getMetadata(ROUTE_METADATA.PATH, target, propertyKey);
  const method = Reflect.getMetadata(ROUTE_METADATA.METHOD, target, propertyKey);
  
  if (!path || !method) {
    return null;
  }

  const config: any = {
    path,
    method,
    controller,
    middlewaresClasses: Reflect.getMetadata(ROUTE_METADATA.MIDDLEWARES, target, propertyKey) || [],
    platform: Reflect.getMetadata(ROUTE_METADATA.PLATFORM, target, propertyKey),
    endUser: Reflect.getMetadata(ROUTE_METADATA.END_USER, target, propertyKey),
    authorization: Reflect.getMetadata(ROUTE_METADATA.AUTHORIZATION, target, propertyKey),
    isPublic: Reflect.getMetadata(ROUTE_METADATA.IS_PUBLIC, target, propertyKey),
    isTransactionEnabled: Reflect.getMetadata(ROUTE_METADATA.TRANSACTION, target, propertyKey),
    bodySchema: Reflect.getMetadata(ROUTE_METADATA.BODY_SCHEMA, target, propertyKey),
    paramSchema: Reflect.getMetadata(ROUTE_METADATA.PARAM_SCHEMA, target, propertyKey),
    querySchema: Reflect.getMetadata(ROUTE_METADATA.QUERY_SCHEMA, target, propertyKey),
  };

  // Remove undefined values
  Object.keys(config).forEach(key => {
    if (config[key] === undefined) {
      delete config[key];
    }
  });

  return config as RouteConfiguration<TypedRequestOptions, string>;
}