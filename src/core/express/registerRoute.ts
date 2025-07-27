import { RequestHandler } from "express";
import { webMasterRouter } from "../../apps/main/index.routes";
import {
  Middleware,
  RouteConfiguration,
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
