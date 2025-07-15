import { ConversationDTO } from "./../../../../../feature/messages/dtos/Conversation.dto";
import { MessageDTO } from "./../../../../../feature/messages/dtos/Message.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddMessageValidation } from "./AddMessage.validation";

export type AddMessageRouteConfig = AddMessageValidation & {
  files: FilesInRequest<"files" | "media">;
};
export type AddMessageResponse = {
  isNewConversation: boolean;
  message: MessageDTO;
  conversation: ConversationDTO;
};
