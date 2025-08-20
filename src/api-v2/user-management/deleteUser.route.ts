import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserRouteConfig } from "./deleteUser.types";
import { deleteUserValidation } from "./deleteUser.validation";

registerRoute<DeleteUserRouteConfig>()({
    path: "/users/:id",
    method: "delete", 
    endUser: END_USER_ENUM.ADMIN,
    paramsSchema: deleteUserValidation.deleteUserParams,
    authorization: {
        action: ACTION_ENUM.DELETE,
        resource: RESOURCES_ENUM.USER
    },
    controller: DeleteUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares()
});