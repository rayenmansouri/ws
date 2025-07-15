import { TEndUserEnum } from "../../../constants/globalEnums";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type ReactionsDTO = {
  reactionType: TReactionTypeEnum;
  reactedAt: Date;
  user: UserProfileDTO & { type: TEndUserEnum };
}[];
