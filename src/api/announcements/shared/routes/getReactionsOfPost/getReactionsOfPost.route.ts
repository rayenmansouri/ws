import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetReactionsOfPostController } from "./getReactionsOfPost.controller";
import { GetReactionsOfPostRouteConfig } from "./getReactionsOfPost.types";
import { getReactionsOfPostValidation } from "./getReactionsOfPost.validation";

registerSharedRoute<GetReactionsOfPostRouteConfig>()(
  {
    path: "/posts/:postNewId/reactions",
    method: "get",
    paramSchema: getReactionsOfPostValidation.params,
    controller: GetReactionsOfPostController,
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
