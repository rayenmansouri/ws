import { get } from "lodash";
import { getAuthenticatedMiddlewares, getCoreMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { MeController } from "./me.controller";
import { MeRouteConfig } from "./me.types";

export const meRoute: RouteConfiguration<MeRouteConfig, "/me"> = {
  path: "/me",
  method: "get",
  controller: MeController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares()
};
