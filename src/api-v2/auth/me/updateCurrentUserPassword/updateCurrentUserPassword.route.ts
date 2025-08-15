
import { publicRouter } from "../../../../apps/main/routers/public-router";
import { getAuthenticatedMiddlewares } from "../../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../../core/express/types";
import { UpdateCurrentUserPasswordController } from "./updateCurrentUserPassword.controller";
import { UpdateCurrentUserPasswordRouteConfig } from "./updateCurrentUserPassword.types";
import { updateCurrentUserPasswordValidation } from "./updateCurrentUserPassword.validation";

export const updateCurrentUserPasswordRoute: RouteConfiguration<UpdateCurrentUserPasswordRouteConfig, "/password"> = {
  path: "/password",
  method: "patch",
  controller: UpdateCurrentUserPasswordController,
  isTransactionEnabled: false,
  isPublic: false,
  endUser: "admin",
  bodySchema: updateCurrentUserPasswordValidation.body,
  platform: PLATFORM_ENUM.WEB,
  middlewaresClasses: getAuthenticatedMiddlewares(),
  router: publicRouter
};
