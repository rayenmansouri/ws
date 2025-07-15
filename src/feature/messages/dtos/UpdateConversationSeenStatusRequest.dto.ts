import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type UpdateConversationSeenStatusDTO = {
  conversationId: ID;
  userId: ID;
  newId: string;
  phoneNumber: string | null;
  email: string | null;
  userType: TEndUserEnum;
  avatar: string;
  fullName: string;
  tenantId: string;
};
