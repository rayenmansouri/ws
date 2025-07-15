import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { DeleteChapterController } from "./deleteChapter.controller";
import { DeleteChapterRouteConfig } from "./deleteChapter.types";
import { deleteChapterValidation } from "./deleteChapter.validation";

registerSharedRoute<DeleteChapterRouteConfig>()(
  {
    path: "/chapters/:chapterNewId",
    method: "delete",
    paramSchema: deleteChapterValidation.params,
    controller: DeleteChapterController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
