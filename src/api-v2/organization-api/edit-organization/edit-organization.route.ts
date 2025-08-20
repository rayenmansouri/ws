import { masterRouter } from "../../../apps/main/routers/master-router";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { EditOrganizationController } from "./edit-organization.controller";
import { EditOrganizationRouteConfig } from "./edit-organization.types";
import { editOrganizationValidation } from "./edit-organization.validation";

export const editOrganizationRoute: RouteConfiguration<EditOrganizationRouteConfig, "/organizations/:id"> = {
    path: "/organizations/:id",
    method: "put",
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: editOrganizationValidation.body,
    paramSchema: editOrganizationValidation.params,
    controller: EditOrganizationController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses: getAuthenticatedMiddlewares(),
    router: masterRouter
};
