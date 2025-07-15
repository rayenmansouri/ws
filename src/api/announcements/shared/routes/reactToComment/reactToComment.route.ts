import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ReactToCommentController } from "./reactToComment.controller";
import { ReactToCommentRouteConfig } from "./reactToComment.types";
import { reactToCommentValidation } from "./reactToComment.validation";

registerSharedRoute<ReactToCommentRouteConfig>()(
  {
    path: "/comments/:commentNewId/react",
    method: "put",
    bodySchema: reactToCommentValidation.body,
    paramSchema: reactToCommentValidation.params,
    controller: ReactToCommentController,
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
