import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ReactToPostController } from "./reactToPost.controller";
import { ReactToPostRouteConfig } from "./reactToPost.types";
import { reactToPostValidation } from "./reactToPost.validation";

registerSharedRoute<ReactToPostRouteConfig>()(
  {
    path: "/posts/:postNewId/reactions",
    method: "put",
    bodySchema: reactToPostValidation.body,
    paramSchema: reactToPostValidation.params,
    controller: ReactToPostController,
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
