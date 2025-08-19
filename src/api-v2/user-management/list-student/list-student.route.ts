import { adminRouter } from "../../../apps/main/routers/admin-router";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getAuthorizedMiddlewares } from "../../../core/express/middlewares/registerCoreMiddlewares";
import { RouteConfiguration } from "../../../core/express/types";
import { ListStudentController } from "./list-student.controller";
import { ListStudentRouteConfig } from "./list-student.types";
import { listStudentQuerySchema } from "./list-student.types";
import { listStudentRouteObject } from "../../../../shared-types/routes/user-management/list-student";

export const listStudentRoute: RouteConfiguration<ListStudentRouteConfig, string> = {
    path: listStudentRouteObject.path,
    method: listStudentRouteObject.method as "get",
    endUser: END_USER_ENUM.ADMIN,
    querySchema: listStudentQuerySchema,
    authorization: {
        action: ACTION_ENUM.LIST,
        resource: RESOURCES_ENUM.TEENAGE
    },
    controller: ListStudentController,
    isTransactionEnabled: false,
    platform: "web",
    middlewaresClasses: getAuthorizedMiddlewares(),
    router: adminRouter
};
