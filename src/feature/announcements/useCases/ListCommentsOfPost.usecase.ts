import { injectable } from "inversify";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { CommentDTO } from "../dtos/comment.dto";
import { CommentMapper } from "../mappers/Comment.mapper";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { PostRepo } from "../repos/Post.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";

@injectable()
export class ListCommentsOfPostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
  ) {}

  async execute(
    postNewId: string,
    userDetails: IsUserAllowedToViewAllPostsParams,
    options: ListOptions,
  ): Promise<ResponseWithPagination<CommentDTO>> {
    const post = await this.postRepo.findOneByNewIdOrThrow(postNewId, "notFound.post");

    if (!PostService.isUserAllowedToViewAllPosts(userDetails)) {
      const userPostFeed = await this.userPostFeedRepo.findPostFeedOfUser(userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userPostFeed, post._id))
        throw new NotFoundError("notFound.post");
    }

    const postComments = await this.commentRepo.listCommentsOfPost(post._id, options);
    const commentIds = postComments.docs.map(comment => comment._id);
    const repliesOfComments = await this.commentRepo.getRepliesOfComments(commentIds);
    const replyIds = repliesOfComments.map(reply => reply._id);

    const reactions = await this.reactionRepo.findReactionsOfComments([...commentIds, ...replyIds]);

    const commentsDTO = postComments.docs.map(comment => {
      const commentReaction = reactions.find(
        reaction => reaction.comment === comment._id,
      ) as Reaction;

      const commentReplies = repliesOfComments.filter(reply => reply.parentComment === comment._id);

      const repliesDTO = commentReplies.map(reply => {
        const replyReaction = reactions.find(
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
        commentReplies: repliesDTO,
        userId: userDetails.user._id,
      });
    });

    return {
      docs: commentsDTO,
      meta: postComments.meta,
    };
  }
}
