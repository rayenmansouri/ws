import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetReactionsOfCommentController } from "./getReactionsOfComment.controller";
import { GetReactionsOfCommentRouteConfig } from "./getReactionsOfComment.types";
import { getReactionsOfCommentValidation } from "./getReactionsOfComment.validation";

registerSharedRoute<GetReactionsOfCommentRouteConfig>()(
  {
    path: "/comments/:commentNewId/reactions",
    method: "get",
    paramSchema: getReactionsOfCommentValidation.params,
    controller: GetReactionsOfCommentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
