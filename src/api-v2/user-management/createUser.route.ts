import { END_USER_ENUM } from "../../constants/globalEnums";
import { getTenantAuthenticatedMiddlewaresFromParams } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { CreateUserController } from "./create-user.controller";
import { CreateUserRouteConfig } from "./createUser.types";
import { createUserValidation } from "./createUser.validation";

registerRoute<CreateUserRouteConfig>()({
    path: "/:schoolId/users",
    method: "post", 
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: createUserValidation.createUser,
    paramSchema: createUserValidation.paramSchema,
    controller: CreateUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getTenantAuthenticatedMiddlewaresFromParams()
});