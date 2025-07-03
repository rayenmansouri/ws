import { MessageDTO } from "./../../../../../feature/messages/dtos/Message.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListConversationMessagesValidation } from "./listConversationMessages.validation";

export type ListConversationMessagesRouteConfig = ListConversationMessagesValidation & {
  files: never;
};
export type ListConversationMessagesResponse = ResponseWithPagination<MessageDTO>;
