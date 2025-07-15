import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddPostController } from "./addPost.controller";
import { AddPostRouteConfig } from "./addPost.types";
import { addPostValidation } from "./addPost.validation";

registerSharedRoute<AddPostRouteConfig>()(
  {
    path: "/post",
    method: "post",
    bodySchema: addPostValidation.body,
    controller: AddPostController,
    isTransactionEnabled: true,
    upload: { fields: [{ name: "attachments" }] },
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ANNOUNCEMENT },
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
      authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.ANNOUNCEMENT },
    },
  ],
);
