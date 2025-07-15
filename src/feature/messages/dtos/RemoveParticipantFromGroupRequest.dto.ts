import { ID } from "./../../../types/BaseEntity";
export type RemoveParticipantsFromConversationDTO = {
  conversationNewId: string;
  participantsIds: ID[];
  userId: ID;
};
