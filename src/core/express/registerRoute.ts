import { RequestHandler } from "express";
import { webPublicRouter } from "../../apps/main/index.routes";
import {
  RouteConfiguration,
  TypedRequestOptions,
} from "./types";
import { HandleRequestMiddleware } from "./middlewares/handle-request.middleware";
import { IMiddlewareFunction } from "./middlewares/interface";

// Singleton middleware instances cache
const middlewareInstancesCache = new Map<string, IMiddlewareFunction>();

/**
 * Creates or retrieves a cached middleware instance
 */
function getMiddlewareInstance<T extends IMiddlewareFunction>(
  MiddlewareClass: new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => T,
  routeConfig: RouteConfiguration<TypedRequestOptions, string>
): T {
  const key = `${MiddlewareClass.name}_${JSON.stringify({
    path: routeConfig.path,
    method: routeConfig.method,
    endUser: routeConfig.endUser
  })}`;
  
  if (!middlewareInstancesCache.has(key)) {
    middlewareInstancesCache.set(key, new MiddlewareClass(routeConfig));
  }
  
  return middlewareInstancesCache.get(key) as T;
}

export const registerRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(routeConfig: RouteConfiguration<Options, Path>): void => {
    try {
      // Validate required controller identifier
      if (!routeConfig.controller.identifier) {
        throw new Error(`Controller identifier is required for route: ${routeConfig.path}`);
      }

      const { middlewaresClasses = [] } = routeConfig;
      const middlewares: RequestHandler[] = [];
      
      // Process middleware classes with caching and error handling
      for (const MiddlewareClass of middlewaresClasses) {
        try {
          const middleware = getMiddlewareInstance(
            MiddlewareClass, 
            routeConfig as RouteConfiguration<TypedRequestOptions, string>
          );
          
          if (middleware.canActivate()) {
            const middlewareFunctions = middleware.getMiddleware();
            middlewares.push(...(middlewareFunctions as RequestHandler[]));
          }
        } catch (error) {
          console.error(`Failed to initialize middleware ${MiddlewareClass.name}:`, error);
          throw new Error(`Middleware initialization failed for ${MiddlewareClass.name}`);
        }
      }
      
      // Add request handler middleware
      const handleRequestMiddleware = new HandleRequestMiddleware(
        routeConfig as RouteConfiguration<TypedRequestOptions, string>
      );
      middlewares.push(handleRequestMiddleware.getMiddleware()[0] as RequestHandler);
      
      // Register the route with proper type safety
      webPublicRouter[routeConfig.method](routeConfig.path, ...middlewares);
      
      console.log(`✅ Route registered: ${routeConfig.method.toUpperCase()} ${routeConfig.path}`);
      
    } catch (error) {
      console.error(`❌ Failed to register route ${routeConfig.path}:`, error);
      throw error;
    }
  };
