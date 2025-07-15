import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { CommentMetaData } from "../domain/comment.entity";
import { Reaction } from "../domain/reaction.entity";
import { ReactionService } from "../domain/Reactions.service";
import { CommentDTO } from "../dtos/comment.dto";
import { ReplyDTO } from "../dtos/reply.dto";

type ToCommentParams = {
  comment: Populate<CommentMetaData, "user">;
  commentReaction: Pick<Reaction, "users">;
  commentReplies: ReplyDTO[];
  userId: ID;
};

export class CommentMapper {
  private static MAX_NUMBER_OF_REPLIES_PER_COMMENT = 3;

  static toCommentDTO({
    comment,
    commentReaction,
    commentReplies,
    userId,
  }: ToCommentParams): CommentDTO {
    return {
      postId: comment.post,
      _id: comment._id,
      newId: comment.newId,
      content: comment.content,
      attachments: comment.attachments,
      media: comment.media,
      repliesCount: commentReplies.length,
      replies: commentReplies.slice(0, this.MAX_NUMBER_OF_REPLIES_PER_COMMENT),
      reactionSummary: ReactionService.getReactionSummary(commentReaction),
      user: { ...UserMapper.toUserProfileDTO(comment.user), type: comment.userType },
      userReaction: ReactionService.getUserReaction(commentReaction, userId),
      publishedAt: comment.publishedAt,
    };
  }
}
