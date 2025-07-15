import { ConversationDTO } from "./../../../../../feature/messages/dtos/Conversation.dto";

import { GetOneConversationValidation } from "./getOneConversation.validation";

export type GetOneConversationRouteConfig = GetOneConversationValidation & { files: never };
export type GetOneConversationResponse = ConversationDTO;
