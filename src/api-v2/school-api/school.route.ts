import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthenticatedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { CreateSchoolController } from "./school.controller";
import { CreateSchoolRouteConfig } from "./school.types";
import { schoolValidation } from "./school.validation";

registerRoute<CreateSchoolRouteConfig>()({
    path: "/schools",
    method: "post",
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: schoolValidation.createSchool,
    controller: CreateSchoolController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses:getAuthenticatedMiddlewares()
});

