import { TEndUserEnum } from "./../../../constants/globalEnums";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { ReactionSummary } from "../domain/Reactions.service";
import { ReplyDTO } from "./reply.dto";

export type CommentDTO = {
  _id: ID;
  newId: string;
  content: string | null;
  attachments: IFile[];
  media: IFile[];
  repliesCount: number;
  replies: ReplyDTO[];
  reactionSummary: ReactionSummary;
  user: UserProfileDTO & { type: TEndUserEnum };
  userReaction: TReactionTypeEnum | null;
  publishedAt: Date;
  postId: ID;
};
