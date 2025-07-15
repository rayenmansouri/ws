import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOnePostController } from "./getOnePost.controller";
import { GetOnePostRouteConfig } from "./getOnePost.types";
import { getOnePostValidation } from "./getOnePost.validation";

registerSharedRoute<GetOnePostRouteConfig>()(
  {
    path: "/posts/:postNewId",
    method: "get",
    paramSchema: getOnePostValidation.params,
    controller: GetOnePostController,
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
