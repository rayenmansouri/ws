import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListUsersController } from "./listUsers.controller";
import { ListUsersRouteConfig } from "./listUsers.types";
import { listUsersValidation } from "./listUsers.validation";

registerSharedRoute<ListUsersRouteConfig>()(
  {
    path: "/users/new",
    method: "get",
    querySchema: listUsersValidation.query,
    controller: ListUsersController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
  ],
);
