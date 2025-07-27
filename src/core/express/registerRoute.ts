import { RequestHandler } from "express";
import { webMasterRouter } from "../../apps/main/index.routes";
import {
  RouteConfiguration,
  TypedRequestOptions,
} from "./types";
import { MiddlewareRegistry } from "./middlewares/MiddlewareRegistry";

export const registerRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(routeConfig: RouteConfiguration<Options, Path>): void => {
    const registry = MiddlewareRegistry.getInstance();
    const middlewares = registry.getMiddlewareForRoute(routeConfig as RouteConfiguration<TypedRequestOptions, string>);
    
    webMasterRouter[routeConfig.method](routeConfig.path, ...middlewares as RequestHandler[]);
  };
