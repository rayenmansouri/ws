import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserRouteConfig } from "./update-user.types";
import { updateUserValidation } from "./update-user.validation";

registerRoute<UpdateUserRouteConfig>()({
    path: "/users/:userId",
    method: "patch", 
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: updateUserValidation.updateUser,
    paramSchema: updateUserValidation.updateUserParams,
    authorization: {
        action: ACTION_ENUM.EDIT,
        resource: RESOURCES_ENUM.USER
    },
    controller: UpdateUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares()
});