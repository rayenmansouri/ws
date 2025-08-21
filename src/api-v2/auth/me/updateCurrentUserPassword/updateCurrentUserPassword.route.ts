
import { publicRouter } from "../../../../apps/main/routers/public-router";
import { getAuthenticatedMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { UpdateCurrentUserPasswordController } from "./updateCurrentUserPassword.controller";
import { UpdateCurrentUserPasswordRouteConfig } from "./updateCurrentUserPassword.types";
import { updateCurrentUserPasswordValidation } from "./updateCurrentUserPassword.validation";
import { updateCurrentUserPasswordRoute as updateCurrentUserPasswordRouteConfig } from "../../../../../shared-types/routes/auth/me/updateCurrentUserPassword";

export const updateCurrentUserPasswordRoute: RouteConfiguration<UpdateCurrentUserPasswordRouteConfig, "/password"> = {
  path: updateCurrentUserPasswordRouteConfig.path,
  method: updateCurrentUserPasswordRouteConfig.method,
  controller: UpdateCurrentUserPasswordController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  bodySchema: updateCurrentUserPasswordValidation.body,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: publicRouter
};
