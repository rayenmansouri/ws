import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddChapterController } from "./addChapter.controller";
import { AddChapterRouteConfig } from "./addChapter.types";
import { addChapterValidation } from "./addChapter.validation";

registerSharedRoute<AddChapterRouteConfig>()(
  {
    path: "/chapters",
    method: "post",
    bodySchema: addChapterValidation.body,
    controller: AddChapterController,
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
