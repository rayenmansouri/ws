import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TMessageReactionTypeEnum } from "../domain/message.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";

export type GetMessagesReactionsDto = {
  reactionType: TMessageReactionTypeEnum;
  reactedAt: Date;
  user: UserProfileDTO & { type: TEndUserEnum };
};
