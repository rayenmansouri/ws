import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetCurrentUserController } from "./getCurrentUser.controller";
import { GetCurrentUserRouteConfig } from "./getCurrentUser.types";

registerSharedRoute<GetCurrentUserRouteConfig>()(
  {
    path: "/me",
    method: "get",
    controller: GetCurrentUserController,
    isTransactionEnabled: false,
  },
  [{ endUser: END_USER_ENUM.PARENT, platforms: ["mobile", "web"] }],
);
