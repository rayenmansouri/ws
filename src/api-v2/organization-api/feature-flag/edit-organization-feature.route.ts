import { editFlagParamsValidation, editFlagValidation } from "./edit-flag.validation";
import { PLATFORM_ENUM, RouteConfiguration } from "../../../core/express/types";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { EditFeatureFlagController } from "./edit-flag.controller";
import { getAuthenticatedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { masterRouter } from "../../../apps/main/routers/master-router";
import { EditFeatureFlagRouteType } from "./edit-flag.types";
import { editFlagRoute } from "../../../../shared-types/routes/organization-api/edit-flag";

export const editOrganizationFeatureFlagRoute: RouteConfiguration<EditFeatureFlagRouteType, typeof editFlagRoute.path> = {
    path: editFlagRoute.path,
    method: editFlagRoute.method,
    endUser: END_USER_ENUM.MASTER,
    bodySchema: editFlagValidation,
    paramSchema: editFlagParamsValidation,
    controller: EditFeatureFlagController,
    isTransactionEnabled: false,
    isPublic: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses: getAuthenticatedMiddlewares(),
    router: masterRouter
};
