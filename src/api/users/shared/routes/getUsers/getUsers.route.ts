import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetUsersController } from "./getUsers.controller";
import { GetUsersRouteConfig } from "./getUsers.types";
import { getUsersValidation } from "./getUsers.validation";

registerSharedRoute<GetUsersRouteConfig>()(
  {
    path: "/users",
    method: "get",
    querySchema: getUsersValidation.query,
    controller: GetUsersController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
  ],
);
