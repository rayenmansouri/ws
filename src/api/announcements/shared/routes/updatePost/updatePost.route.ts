import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdatePostController } from "./updatePost.controller";
import { UpdatePostRouteConfig } from "./updatePost.types";
import { updatePostValidation } from "./updatePost.validation";

registerSharedRoute<UpdatePostRouteConfig>()(
  {
    path: "/posts/:postNewId",
    method: "patch",
    bodySchema: updatePostValidation.body,
    paramSchema: updatePostValidation.params,
    controller: UpdatePostController,
    isTransactionEnabled: true,
    upload: { fields: [{ name: "attachments" }] },
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
  ],
);
