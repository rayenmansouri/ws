import { ID } from "./../../../types/BaseEntity";

export type UpdateConversationNameDTO = {
  conversationNewId: string;
  name: string;
  userId: ID;
  tenantId: string;
};
