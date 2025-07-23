import { ID } from "./../../../types/BaseEntity";
import { userWithUserType } from "./../domain/Conversation.repo";

export type AddParticipantsToConversationDTO = {
  conversationNewId: string;
  participants: userWithUserType[];
  tenantId: string;
  userId: ID;
};
