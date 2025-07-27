import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import Logger from "../../Logger";

export const loggingMiddleware = (): Middleware =>
  asyncHandlerForMiddleware((req: TypedRequest, _: Response, next: NextFunction) => {
    Logger.info(`${req.method} ${req.path} - User: ${req.user?.fullName || 'Unknown'}`);
    next();
  });

export class LoggingMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  
  canActivate(): boolean {
    // Enable logging for all routes
    return true;
  }

  getMiddleware(): Middleware[] {
    return [loggingMiddleware()];
  }
} 