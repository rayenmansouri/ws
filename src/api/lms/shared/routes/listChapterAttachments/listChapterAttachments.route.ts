import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListChapterAttachmentsController } from "./listChapterAttachments.controller";
import { ListChapterAttachmentsRouteConfig } from "./listChapterAttachments.types";
import { listChapterAttachmentsValidation } from "./listChapterAttachments.validation";

registerSharedRoute<ListChapterAttachmentsRouteConfig>()(
  {
    path: "/chapters",
    method: "get",
    querySchema: listChapterAttachmentsValidation.query,
    controller: ListChapterAttachmentsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
  ],
);
