import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetClassListController } from "./getClassList.controller";
import { GetClassListRouteConfig } from "./getClassList.types";

registerRoute<GetClassListRouteConfig>()({
  path: "/classes/list",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  controller: GetClassListController,
  isTransactionEnabled: false,
  platform: "web",
});
