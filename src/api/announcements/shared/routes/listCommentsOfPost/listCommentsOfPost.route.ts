import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListCommentsOfPostController } from "./listCommentsOfPost.controller";
import { ListCommentsOfPostRouteConfig } from "./listCommentsOfPost.types";
import { listCommentsOfPostValidation } from "./listCommentsOfPost.validation";

registerSharedRoute<ListCommentsOfPostRouteConfig>()(
  {
    path: "/posts/:postNewId/comments",
    method: "get",
    querySchema: listCommentsOfPostValidation.query,
    paramSchema: listCommentsOfPostValidation.params,
    controller: ListCommentsOfPostController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
