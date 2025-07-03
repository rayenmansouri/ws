import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListPostsController } from "./listPosts.controller";
import { ListPostsRouteConfig } from "./listPosts.types";
import { listPostsValidation } from "./listPosts.validation";

registerRoute<ListPostsRouteConfig>()({
  path: "/posts",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listPostsValidation.query,
  controller: ListPostsController,
  isTransactionEnabled: false,
  platform: "web",
});
