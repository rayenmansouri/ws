import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAppVersionController } from "./getAppVersion.controller";
import { GetAppVersionRouteConfig } from "./getAppVersion.types";

registerRoute<GetAppVersionRouteConfig>()({
  path: "/app-versions",
  method: "get",
  endUser: undefined,
  controller: GetAppVersionController,
  isTransactionEnabled: false,
  platform: "web",
  isPublic: true,
});
