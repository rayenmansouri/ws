import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListPostsController } from "./listPosts.controller";
import { ListPostsRouteConfig } from "./listPosts.types";
import { listPostsValidation } from "./listPosts.validation";

registerSharedRoute<ListPostsRouteConfig>()(
  {
    path: "/posts",
    method: "get",
    querySchema: listPostsValidation.query,
    controller: ListPostsController,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
