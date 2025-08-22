import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { CreateOrganizationController } from "./organization.controller";
import { organizationValidation } from "./organization.validation";
import { CreateOrganizationRouteConfig } from "./organization.types";
import { masterRouter } from "../../../apps/main/routers/master-router";
import { createOrganizationRoute } from "../../../../shared-types/routes/organization-api/create-organization";

export const organizationRoute: RouteConfiguration<CreateOrganizationRouteConfig, "/organizations"> = {
    path: createOrganizationRoute.path,
    method: createOrganizationRoute.method,
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: organizationValidation.createOrganization,
    controller: CreateOrganizationController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses:getAuthenticatedMiddlewares(),
    router: masterRouter
};

