import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationAttachmentsController } from "./listConversationAttachments.controller";
import { ListConversationAttachmentsRouteConfig } from "./listConversationAttachments.types";
import { listConversationAttachmentsValidation } from "./listConversationAttachments.validation";

registerSharedRoute<ListConversationAttachmentsRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/attachments",
    method: "get",
    querySchema: listConversationAttachmentsValidation.query,
    paramSchema: listConversationAttachmentsValidation.params,
    controller: ListConversationAttachmentsController,
    isTransactionEnabled: false,
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
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
