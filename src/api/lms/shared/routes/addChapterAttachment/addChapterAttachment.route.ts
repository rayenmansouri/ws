import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddChapterAttachmentController } from "./addChapterAttachment.controller";
import { AddChapterAttachmentRouteConfig } from "./addChapterAttachment.types";
import { addChapterAttachmentValidation } from "./addChapterAttachment.validation";

registerSharedRoute<AddChapterAttachmentRouteConfig>()(
  {
    path: "/chapters/attachments",
    method: "post",
    bodySchema: addChapterAttachmentValidation.body,

    controller: AddChapterAttachmentController,
    isTransactionEnabled: false,

    upload: { fields: [{ name: "files" }] },
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
  ],
);
