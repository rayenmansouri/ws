import { injectable } from "inversify";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { ReplyDTO } from "../dtos/reply.dto";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";

@injectable()
export class ListRepliesOfCommentUseCase {
  constructor(
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
  ) {}

  async execute(
    commentNewId: string,
    userDetails: IsUserAllowedToViewAllPostsParams,
    options: ListOptions,
  ): Promise<ResponseWithPagination<ReplyDTO>> {
    const comment = await this.commentRepo.findOneByNewIdOrThrow(commentNewId, "notFound.comment", {
      populate: ["user"],
    });

    if (!PostService.isUserAllowedToViewAllPosts(userDetails)) {
      const userPostFeed = await this.userPostFeedRepo.findPostFeedOfUser(userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userPostFeed, comment.post))
        throw new NotFoundError("notFound.post");
    }

    const replies = await this.commentRepo.listRepliesOfComment(comment._id, options);
    const replyIds = replies.docs.map(reply => reply._id);
    const replyReactions = await this.reactionRepo.findReactionsOfComments(replyIds);

    const repliesDTO = replies.docs.map(reply => {
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

    return {
      docs: repliesDTO,
      meta: replies.meta,
    };
  }
}
