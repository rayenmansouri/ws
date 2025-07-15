import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateChapterAttachmentController } from "./updateChapterAttachment.controller";
import { UpdateChapterAttachmentRouteConfig } from "./updateChapterAttachment.types";
import { updateChapterAttachmentValidation } from "./updateChapterAttachment.validation";

registerSharedRoute<UpdateChapterAttachmentRouteConfig>()(
  {
    path: "/chapters/attachments/:chapterAttachmentNewId",
    method: "patch",
    bodySchema: updateChapterAttachmentValidation.body,
    paramSchema: updateChapterAttachmentValidation.params,
    controller: UpdateChapterAttachmentController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "files" }] },
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
  ],
);
