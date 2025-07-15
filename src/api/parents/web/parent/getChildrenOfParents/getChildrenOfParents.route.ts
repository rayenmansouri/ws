import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetChildrenOfParentsController } from "./getChildrenOfParents.controller";
import { GetChildrenOfParentsRouteConfig } from "./getChildrenOfParents.types";

registerRoute<GetChildrenOfParentsRouteConfig>()({
  path: "/children",
  method: "get",
  endUser: END_USER_ENUM.PARENT,
  controller: GetChildrenOfParentsController,
  isTransactionEnabled: false,
  platform: "web",
});
