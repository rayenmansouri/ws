import { MessageAttachmentDTO } from "./../../../../../feature/messages/dtos/Message.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListConversationMultimediaValidation } from "./listConversationMultimedia.validation";

export type ListConversationMultimediaRouteConfig = ListConversationMultimediaValidation & {
  files: never;
};
export type ListConversationMultimediaResponse = ResponseWithPagination<MessageAttachmentDTO>;
