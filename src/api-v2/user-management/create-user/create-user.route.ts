import { adminRouter } from "../../../apps/main/routers/admin-router";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { RouteConfiguration } from "../../../core/express/types";
import { CreateUserController } from "./create-user.controller";
import { CreateUserRouteConfig } from "./create-user.types";
import { createUserValidation } from "./create-user.validation";
import { createAdminRouteObject, createCoachRouteObject, createParticipantRouteObject } from "../../../../shared-types/routes/user-management/createUser";

export const createParticipantRoute: RouteConfiguration<CreateUserRouteConfig, string> = {
    path: createParticipantRouteObject.path, 
    method: createParticipantRouteObject.method as "post",
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
    router: adminRouter
};


export const createAdminRoute: RouteConfiguration<CreateUserRouteConfig, string> = {
    path: createAdminRouteObject.path,
    method: createAdminRouteObject.method as "post",
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
    router: adminRouter
};


export const coachRoute: RouteConfiguration<CreateUserRouteConfig, string> = {
    path: createCoachRouteObject.path,
    method: createCoachRouteObject.method as "post",
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
    router: adminRouter
};