import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { DeletePostController } from "./deletePost.controller";
import { DeletePostRouteConfig } from "./deletePost.types";
import { deletePostValidation } from "./deletePost.validation";

registerSharedRoute<DeletePostRouteConfig>()(
  {
    path: "/posts/:postNewId",
    method: "delete",
    paramSchema: deletePostValidation.params,
    controller: DeletePostController,
    isTransactionEnabled: true,
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
