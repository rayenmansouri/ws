import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListChapterVideoController } from "./listChapterVideo.controller";
import { ListChapterVideoRouteConfig } from "./listChapterVideo.types";
import { listChapterVideoValidation } from "./listChapterVideo.validation";

registerSharedRoute<ListChapterVideoRouteConfig>()(
  {
    path: "/chapters/videos",
    method: "get",
    querySchema: listChapterVideoValidation.query,
    controller: ListChapterVideoController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
    },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web"] },
  ],
);
