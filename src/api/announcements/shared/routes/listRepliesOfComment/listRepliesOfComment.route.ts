import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListRepliesOfCommentController } from "./listRepliesOfComment.controller";
import { ListRepliesOfCommentRouteConfig } from "./listRepliesOfComment.types";
import { listRepliesOfCommentValidation } from "./listRepliesOfComment.validation";

registerSharedRoute<ListRepliesOfCommentRouteConfig>()(
  {
    path: "/comments/:commentNewId/replies",
    method: "get",
    querySchema: listRepliesOfCommentValidation.query,
    paramSchema: listRepliesOfCommentValidation.params,
    controller: ListRepliesOfCommentController,
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
