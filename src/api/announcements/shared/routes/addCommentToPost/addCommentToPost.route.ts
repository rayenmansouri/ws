import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddCommentToPostController } from "./addCommentToPost.controller";
import { AddCommentToPostRouteConfig } from "./addCommentToPost.types";
import { addCommentToPostValidation } from "./addCommentToPost.validation";

registerSharedRoute<AddCommentToPostRouteConfig>()(
  {
    path: "/posts/:postNewId/comments",
    method: "post",
    bodySchema: addCommentToPostValidation.body,
    paramSchema: addCommentToPostValidation.params,
    controller: AddCommentToPostController,
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
