import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { DeleteChapterAttachmentController } from "./deleteChapterAttachment.controller";
import { DeleteChapterAttachmentRouteConfig } from "./deleteChapterAttachment.types";
import { deleteChapterAttachmentValidation } from "./deleteChapterAttachment.validation";

registerSharedRoute<DeleteChapterAttachmentRouteConfig>()(
  {
    path: "/chapters/attachments/:chapterAttachmentNewId",
    method: "delete",
    paramSchema: deleteChapterAttachmentValidation.params,
    controller: DeleteChapterAttachmentController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.LMS },
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.LMS },
    },
  ],
);
