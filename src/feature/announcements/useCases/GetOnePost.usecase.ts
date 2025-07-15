import { injectable } from "inversify";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { School } from "../../schools/domain/school.entity";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { PostDTO } from "../dtos/posts.dto";
import { CommentMapper } from "../mappers/Comment.mapper";
import { PostMapper } from "../mappers/Post.mapper";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { PostRepo } from "../repos/Post.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";

@injectable()
export class GetOnePostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("School") private school: School,
  ) {}

  async execute(
    postNewId: string,
    userDetails: IsUserAllowedToViewAllPostsParams,
  ): Promise<PostDTO> {
    const post = await this.postRepo.findOneByNewIdOrThrow(postNewId, "notFound.post", {
      populate: ["author", "classes", "levels", "groups"],
    });

    if (!PostService.isUserAllowedToViewAllPosts(userDetails)) {
      const userPostFeed = await this.userPostFeedRepo.findPostFeedOfUser(userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userPostFeed, post._id))
        throw new NotFoundError("notFound.post");
    }

    const postComments = await this.commentRepo.getCommentsOfPosts([post._id]);
    const postReplies = await this.commentRepo.getRepliesOfPosts([post._id]);
    const postReaction = (await this.reactionRepo.findReactionsOfPosts([post._id]))[0];

    const commentIds = [
      ...postComments.map(comment => comment._id),
      ...postReplies.map(reply => reply._id),
    ];

    const commentReactions = await this.reactionRepo.findReactionsOfComments(commentIds);

    const commentsDTO = postComments.map(comment => {
      const commentReplies = postReplies.filter(reply => reply.parentComment === comment._id);
      const commentReaction = commentReactions.find(
        reaction => reaction.comment === comment._id,
      ) as Reaction;

      const repliesDTO = commentReplies.map(reply => {
        const replyReaction = commentReactions.find(
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
        commentReplies: repliesDTO,
        userId: userDetails.user._id,
        commentReaction,
      });
    });

    const isUserAllowedToViewAllPosts = PostService.isUserAllowedToViewAllPosts(userDetails);

    return PostMapper.toPostDTO({
      post,
      postReaction,
      comments: commentsDTO,
      school: this.school,
      userId: userDetails.user._id,
      includePublisher: isUserAllowedToViewAllPosts ? true : false,
    });
  }
}
