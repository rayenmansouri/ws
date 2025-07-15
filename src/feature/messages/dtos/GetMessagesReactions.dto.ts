import { TEndUserEnum } from "./../../../constants/globalEnums";
import { TReactionTypeEnum } from "../../announcements/domain/reaction.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type GetMessagesReactionsDto = {
  reactionType: TReactionTypeEnum;
  reactedAt: Date;
  user: UserProfileDTO & { type: TEndUserEnum };
};
