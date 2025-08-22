import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { registerRoute } from "../../core/express/registerRoute";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserRouteConfig } from "./delete-user.types";
import { deleteUserValidation } from "./delete-user.validation";

registerRoute<DeleteUserRouteConfig>()({
    path: "/users/:userId",
    method: "delete", 
    endUser: END_USER_ENUM.MASTER,
    paramSchema: deleteUserValidation.deleteUserParams,
    authorization: {
        action: ACTION_ENUM.DELETE,
        resource: RESOURCES_ENUM.USER
    },
    controller: DeleteUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares()
});