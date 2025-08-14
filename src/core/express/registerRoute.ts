import { RequestHandler } from "express";
import {
  RouteConfiguration,
  TypedRequestOptions,
} from "./types";
import { HandleRequestMiddleware } from "./middlewares/handle-request.middleware";

export const registerRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(routeConfig: RouteConfiguration<Options, Path>): void => {
    const { middlewaresClasses = [], router } = routeConfig;
    const middlewares = [];
    for (const middlewareClass of middlewaresClasses) {
      const middleware = new middlewareClass(routeConfig as RouteConfiguration<TypedRequestOptions, string>);
      if (middleware.canActivate()) {
        middlewares.push(...middleware.getMiddleware());
      }
    }
    middlewares.push(new HandleRequestMiddleware(routeConfig as RouteConfiguration<TypedRequestOptions, string>).getMiddleware());
    router[routeConfig.method](routeConfig.path, ...middlewares as RequestHandler[]);
  };
