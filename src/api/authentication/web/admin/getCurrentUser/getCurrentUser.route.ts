import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCurrentUserController } from "./getCurrentUser.controller";
import { GetCurrentUserRouteConfig } from "./getCurrentUser.types";

registerRoute<GetCurrentUserRouteConfig>()({
  path: "/me",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  controller: GetCurrentUserController,
  isTransactionEnabled: false,
  platform: "web",
});
