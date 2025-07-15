import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { TMessageReactionTypeEnum } from "../domain/message.entity";

export type AddReactToMessageRequestDTO = {
  messageNewId: string;
  reactionType: TMessageReactionTypeEnum | null;
  userId: ID;
  userType: TEndUserEnum;
  tenantId: string;
};
