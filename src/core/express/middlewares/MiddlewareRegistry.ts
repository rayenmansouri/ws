import { RouteConfiguration, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { Middleware } from "../types";

export class MiddlewareRegistry {
  private static instance: MiddlewareRegistry | null = null;
  private middlewareClasses: (new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction)[] = [];

  static getInstance(): MiddlewareRegistry {
    if (MiddlewareRegistry.instance === null) {
      MiddlewareRegistry.instance = new MiddlewareRegistry();
    }
    return MiddlewareRegistry.instance;
  }

  add(middlewareClass: new (routeConfig: RouteConfiguration<TypedRequestOptions, string>) => IMiddlewareFunction): void {
    this.middlewareClasses.push(middlewareClass);
  }

  getMiddlewareForRoute(routeConfig: RouteConfiguration<TypedRequestOptions, string>): Middleware[] {
    const activeMiddlewares: Middleware[] = [];
    
    for (const MiddlewareClass of this.middlewareClasses) {
      const middlewareInstance = new MiddlewareClass(routeConfig);
      if (middlewareInstance.canActivate()) {
        activeMiddlewares.push(...middlewareInstance.getMiddleware());
      }
    }
    
    return activeMiddlewares;
  }
} 