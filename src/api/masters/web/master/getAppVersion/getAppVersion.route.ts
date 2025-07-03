import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAppVersionController } from "./getAppVersion.controller";
import { GetAppVersionRouteConfig } from "./getAppVersion.types";

registerRoute<GetAppVersionRouteConfig>()({
  path: "/app-versions",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  controller: GetAppVersionController,
  isTransactionEnabled: false,
  platform: "web",
});
