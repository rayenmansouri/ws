import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { NextFunction, Response } from "express";

/**
 * Base middleware interface similar to NestJS CanActivate guards
 */
export interface IMiddlewareFunction {
  canActivate(): boolean;
  getMiddleware(): Middleware[];
}

/**
 * Enhanced guard interface for authorization and validation
 */
export interface IGuard extends IMiddlewareFunction {
  canActivate(context?: ExecutionContext): boolean | Promise<boolean>;
}

/**
 * Interceptor interface for request/response transformation
 */
export interface IInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Promise<any> | any;
}

/**
 * Execution context similar to NestJS ExecutionContext
 */
export interface ExecutionContext {
  getRequest<T = TypedRequest<TypedRequestOptions>>(): T;
  getResponse<T = Response>(): T;
  getNext<T = NextFunction>(): T;
  getRouteConfig(): RouteConfiguration<TypedRequestOptions, string>;
  getUserType(): string | undefined;
}

/**
 * Call handler for interceptors
 */
export interface CallHandler {
  handle(): Promise<any>;
}

/**
 * Base abstract guard class
 */
export abstract class BaseGuard implements IGuard {
  constructor(protected readonly routeConfig: RouteConfiguration<TypedRequestOptions, string>) {}

  abstract canActivate(context?: ExecutionContext): boolean | Promise<boolean>;

  getMiddleware(): Middleware[] {
    return [(req, res, next) => this.handleGuard(req, res, next)];
  }

  protected async handleGuard(
    req: TypedRequest<TypedRequestOptions>, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const context = this.createExecutionContext(req, res, next);
      const canActivate = await this.canActivate(context);
      
      if (canActivate) {
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Guard execution failed' });
    }
  }

  protected createExecutionContext(
    req: TypedRequest<TypedRequestOptions>, 
    res: Response, 
    next: NextFunction
  ): ExecutionContext {
    return {
      getRequest: () => req,
      getResponse: () => res,
      getNext: () => next,
      getRouteConfig: () => this.routeConfig,
      getUserType: () => req.userType,
    };
  }
}

/**
 * Base abstract interceptor class
 */
export abstract class BaseInterceptor implements IInterceptor {
  abstract intercept(context: ExecutionContext, next: CallHandler): Promise<any> | any;
}