import { masterRouter } from "../../../apps/main/routers/master-router";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { GetAllOrganizationsController } from "./get-all-organizations.controller";
import { GetAllOrganizationsRouteConfig } from "./get-all-organizations.types";
import { getAllOrganizationsValidation } from "./get-all-organizations.validation";

export const getAllOrganizationsRoute: RouteConfiguration<GetAllOrganizationsRouteConfig, "/organizations"> = {
    path: "/organizations",
    method: "get",
    endUser: END_USER_ENUM.ADMIN,
    querySchema: getAllOrganizationsValidation.query,
    controller: GetAllOrganizationsController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses: getAuthenticatedMiddlewares(),
    router: masterRouter
}