import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserRouteConfig } from "./updateUser.types";
import { updateUserValidation } from "./updateUser.validation";

registerRoute<UpdateUserRouteConfig>()({
    path: "/users/:id",
    method: "put", 
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: updateUserValidation.updateUserBody,
    paramsSchema: updateUserValidation.updateUserParams,
    authorization: {
        action: ACTION_ENUM.EDIT,
        resource: RESOURCES_ENUM.USER
    },
    controller: UpdateUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares()
});