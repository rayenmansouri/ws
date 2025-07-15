import { MessageAttachmentDTO } from "./../../../../../feature/messages/dtos/Message.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListConversationAttachmentsValidation } from "./listConversationAttachments.validation";

export type ListConversationAttachmentsRouteConfig = ListConversationAttachmentsValidation & {
  files: never;
};
export type ListConversationAttachmentsResponse = ResponseWithPagination<MessageAttachmentDTO>;
