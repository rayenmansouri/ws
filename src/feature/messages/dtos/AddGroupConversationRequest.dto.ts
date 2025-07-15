import { TEndUserEnum } from "./../../../constants/globalEnums";
import { userWithUserType } from "./../domain/Conversation.repo";
import { ID } from "./../../../types/BaseEntity";

export type AddGroupConversationDTO = {
  participants: userWithUserType[];
  creatorId: ID;
  creatorType: TEndUserEnum;
  tenantId: string;
};
