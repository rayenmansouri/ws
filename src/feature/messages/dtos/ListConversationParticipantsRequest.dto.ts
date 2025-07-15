import { ID } from "./../../../types/BaseEntity";
import { TConversationRoleEnums } from "../domain/conversation.entity";

export interface ListConversationParticipantsRequestDTO {
  conversationNewId: string;
  userId: ID;
  page: number;
  limit: number;
  role?: TConversationRoleEnums;
}
