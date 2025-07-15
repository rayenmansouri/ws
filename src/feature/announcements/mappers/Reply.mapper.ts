import { TEndUserEnum } from "../../../constants/globalEnums";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { CommentMetaData } from "../domain/comment.entity";
import { Reaction } from "../domain/reaction.entity";
import { ReactionService } from "../domain/Reactions.service";
import { ReplyDTO } from "../dtos/reply.dto";

type ToReplyDTOParams = {
  reply: Populate<CommentMetaData, "user">;
  replyReaction: Pick<Reaction, "users">;
  userId: ID;
  userType: TEndUserEnum;
  parentCommentNewId: string;
};

export class ReplyMapper {
  static toReplyDTO({
    reply,
    replyReaction,
    userId,
    userType,
    parentCommentNewId,
  }: ToReplyDTOParams): ReplyDTO {
    return {
      _id: reply._id,
      newId: reply.newId,
      parentCommentId: reply.parentComment as ID,
      parentCommentNewId,
      content: reply.content,
      attachments: reply.attachments,
      media: reply.media,
      reactionSummary: ReactionService.getReactionSummary(replyReaction),
      user: { ...UserMapper.toUserProfileDTO(reply.user), type: userType },
      userReaction: ReactionService.getUserReaction(replyReaction, userId),
      publishedAt: reply.publishedAt,
    };
  }
}
