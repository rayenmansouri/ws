import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../core/express/types";
import { CreateOrganizationController } from "./organization.controller";
import { CreateOrganizationRouteConfig } from "./organization.types";
import { organizationValidation } from "./organization.validation";

export const organizationRoute: RouteConfiguration<CreateOrganizationRouteConfig, "/organizations"> = {
    path: "/organizations",
    method: "post",
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: organizationValidation.createOrganization,
    controller: CreateOrganizationController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses:getAuthenticatedMiddlewares()
};

