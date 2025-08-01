import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { PLATFORM_ENUM, RouteConfiguration } from "../../core/express/types";
import { CreateSchoolController } from "./school.controller";
import { CreateSchoolRouteConfig } from "./school.types";
import { schoolValidation } from "./school.validation";

export const schoolRoute: RouteConfiguration<CreateSchoolRouteConfig, "/schools"> = {
    path: "/schools",
    method: "post",
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: schoolValidation.createSchool,
    controller: CreateSchoolController,
    isTransactionEnabled: false,
    platform: PLATFORM_ENUM.WEB,
    middlewaresClasses:getAuthenticatedMiddlewares()
};

