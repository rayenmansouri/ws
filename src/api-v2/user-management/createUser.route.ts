import { publicRouter } from "../../apps/main/routers/public-router";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../constants/ActionsResource";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../core/express/middlewares/registerCoreMiddlewares";
import { RouteConfiguration } from "../../core/express/types";
import { CreateUserController } from "./create-user.controller";
import { CreateUserRouteConfig } from "./createUser.types";
import { createUserValidation } from "./createUser.validation";

export const createUserRoute: RouteConfiguration<CreateUserRouteConfig, "/users"> = {
    path: "/users",
    method: "post", 
    endUser: END_USER_ENUM.ADMIN,
    bodySchema: createUserValidation.createUser,
    authorization: {
        action: ACTION_ENUM.ADD,
        resource: RESOURCES_ENUM.USER
    },
    controller: CreateUserController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares(),
    router: publicRouter
};