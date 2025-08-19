import { adminRouter } from "../../../../../apps/main/routers/admin-router";
import { getTenantAuthenticatedMiddlewares } from "../../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../../core/express/types";
import { ListLevelsController } from "./listLevels.controller";
import { ListLevelsRouteConfig } from "./listLevels.types";
import { listLevelsValidation } from "./listLevels.validation";

export const listLevelsRoute: RouteConfiguration<ListLevelsRouteConfig, "/levels"> = {
  path: "/levels",
  method: "get",
  controller: ListLevelsController,
  middlewaresClasses: getTenantAuthenticatedMiddlewares(),
  router: adminRouter,
  isPublic: false,
  isTransactionEnabled: false,
  platform: PLATFORM_ENUM.WEB,
  querySchema: listLevelsValidation.query,
  endUser: "admin",
  authorization: { action: "VIEW", resource: "LEVEL" },
};
