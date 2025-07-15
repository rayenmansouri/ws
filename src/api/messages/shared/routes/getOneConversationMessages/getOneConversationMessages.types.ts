import { GetOneConversationMessagesValidation } from "./getOneConversationMessages.validation";

export type GetOneConversationMessagesRouteConfig = GetOneConversationMessagesValidation & {
  files: never;
};
export type GetOneConversationMessagesResponse = {
  conversationNewId: string | null;
};
