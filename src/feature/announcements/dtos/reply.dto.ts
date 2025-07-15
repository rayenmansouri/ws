import { TEndUserEnum } from "../../../constants/globalEnums";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { ReactionSummary } from "../domain/Reactions.service";

export type ReplyDTO = {
  _id: ID;
  newId: string;
  parentCommentNewId: string;
  parentCommentId: ID | null;
  content: string | null;
  attachments: IFile[];
  media: IFile[];
  reactionSummary: ReactionSummary;
  user: UserProfileDTO & { type: TEndUserEnum };
  userReaction: TReactionTypeEnum | null;
  publishedAt: Date;
};
