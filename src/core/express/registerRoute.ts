import { NextFunction, RequestHandler, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { webMasterRouter } from "../../apps/main/index.routes";
import { School } from "../../feature/schools/domain/school.entity";
import { ID } from "../../types/BaseEntity";
import { container } from "../container/container";
import { containerRegistry } from "../container/containerRegistry";
import { APIResponse } from "../responseAPI/APIResponse";
import { schoolDocStore } from "../subdomainStore";
import { BaseController } from "./controllers/BaseController"
import {
  Middleware,
  RouteConfiguration,
  TypedRequest,
  TypedRequestOptions,
} from "./types";
import { allMiddlewares } from "./middlewares";

export const registerRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(routeConfig: RouteConfiguration<Options, Path>): void => {
    const middlewares: Middleware[] = [];
    for (const middleware of allMiddlewares) {
      const instance = new middleware(routeConfig as RouteConfiguration<TypedRequestOptions, string>);
      if (instance.canActivate()) {
        middlewares.push(...instance.getMiddleware());
      }
    }
 

    // middlewares.push((req, _, next) => {
    //   if (req.tenantId) {
    //     Sentry.setTag("school", req.school);
    //     Sentry.setTag("userId", req.userId);
    //     Sentry.setTag("userFullName", req.user.fullName);
    //     Sentry.setTag("userType", routeConfig.endUser);
    //   }
    //   next();
    // });
    webMasterRouter[routeConfig.method](routeConfig.path, ...middlewares as RequestHandler[]);
  };
