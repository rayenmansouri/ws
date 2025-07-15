import { injectable } from "inversify";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { CommentDTO } from "../dtos/comment.dto";
import { CommentMapper } from "../mappers/Comment.mapper";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";

@injectable()
export class GetOneCommentUseCase {
  constructor(
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
  ) {}

  async execute(
    commentNewId: string,
    userDetails: IsUserAllowedToViewAllPostsParams,
  ): Promise<CommentDTO> {
    const comment = await this.commentRepo.findOneByNewIdOrThrow(commentNewId, "notFound.comment", {
      populate: ["user"],
    });
    const commentReaction = (await this.reactionRepo.findReactionsOfComments([comment._id]))[0];

    if (!PostService.isUserAllowedToViewAllPosts(userDetails)) {
      const userPostFeed = await this.userPostFeedRepo.findPostFeedOfUser(userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userPostFeed, comment.post))
        throw new NotFoundError("notFound.post");
    }

    const commentReplies = await this.commentRepo.getRepliesOfComments([comment._id]);
    const replyIds = commentReplies.map(reply => reply._id);
    const replyReactions = await this.reactionRepo.findReactionsOfComments(replyIds);

    const replies = commentReplies.map(reply => {
      const replyReaction = replyReactions.find(
        reaction => reaction.comment === reply._id,
      ) as Reaction;

      return ReplyMapper.toReplyDTO({
        reply,
        replyReaction,
        userId: userDetails.user._id,
        userType: userDetails.userType,
        parentCommentNewId: comment.newId,
      });
    });

    return CommentMapper.toCommentDTO({
      comment,
      commentReaction,
      userId: userDetails.user._id,
      commentReplies: replies,
    });
  }
}
