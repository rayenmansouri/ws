import { ConversationDTO } from "../../../../../feature/messages/dtos/Conversation.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";

import { ListConversationsValidation } from "./listConversations.validation";

export type ListConversationsRouteConfig = ListConversationsValidation & {
  files: never;
};
export type ListConversationsResponse = ResponseWithPagination<ConversationDTO>;
