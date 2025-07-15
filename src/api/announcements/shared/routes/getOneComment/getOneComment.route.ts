import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneCommentController } from "./getOneComment.controller";
import { GetOneCommentRouteConfig } from "./getOneComment.types";
import { getOneCommentValidation } from "./getOneComment.validation";

registerSharedRoute<GetOneCommentRouteConfig>()(
  {
    path: "/comments/:commentNewId",
    method: "get",
    paramSchema: getOneCommentValidation.params,
    controller: GetOneCommentController,
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
