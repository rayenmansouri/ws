import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddReplyToCommentController } from "./addReplyToComment.controller";
import { AddReplyToCommentRouteConfig } from "./addReplyToComment.types";
import { addReplyToCommentValidation } from "./addReplyToComment.validation";

registerSharedRoute<AddReplyToCommentRouteConfig>()(
  {
    path: "/comments/:commentNewId/reply",
    method: "post",
    bodySchema: addReplyToCommentValidation.body,
    paramSchema: addReplyToCommentValidation.params,
    controller: AddReplyToCommentController,
    isTransactionEnabled: true,
    upload: { fields: [{ name: "attachments" }] },
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
