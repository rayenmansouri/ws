import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateChapterController } from "./updateChapter.controller";
import { UpdateChapterRouteConfig } from "./updateChapter.types";
import { updateChapterValidation } from "./updateChapter.validation";

registerSharedRoute<UpdateChapterRouteConfig>()(
  {
    path: "/chapters/:chapterNewId",
    method: "patch",
    bodySchema: updateChapterValidation.body,
    paramSchema: updateChapterValidation.params,
    controller: UpdateChapterController,
    isTransactionEnabled: true,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web"] },
  ],
);
