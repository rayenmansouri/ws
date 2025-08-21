import { adminRouter } from "../../../../../apps/main/routers/admin-router";
import { getTenantAuthenticatedMiddlewares } from "../../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../../core/express/types";
import { ListLevelsController } from "./listLevels.controller";
import { ListLevelsRouteConfig } from "./listLevels.types";
import { listLevelsValidation } from "./listLevels.validation";
import { listLevelsRoute as listLevelsRouteConfig } from "../../../../../../shared-types/routes/level/web/admin/listLevels";

export const listLevelsRoute: RouteConfiguration<ListLevelsRouteConfig, "/levels"> = {
  path: listLevelsRouteConfig.path,
  method: listLevelsRouteConfig.method,
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
