import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type UpdateConversationRequestDTO = {
  conversationNewId: string;
  participants: { _id: ID; userType: TEndUserEnum }[];
  name?: string;
};
