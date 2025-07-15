import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { School } from "../../schools/domain/school.entity";
import { PostMetaData } from "../domain/post.entity";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { Reaction } from "../domain/reaction.entity";
import { PostDTO } from "../dtos/posts.dto";
import { CommentMapper } from "../mappers/Comment.mapper";
import { PostMapper } from "../mappers/Post.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { ListOptions } from "../../../types/types";
import { PostRepo } from "../repos/Post.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

@injectable()
export class ListPostsOfUserUseCase {
  constructor(
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
  ) {}

  async execute(
    filter: {
      hashTags?: string[];
      skipPinned?: true;
    },
    userDetails: IsUserAllowedToViewAllPostsParams,
    options: ListOptions,
  ): Promise<ResponseWithPagination<PostDTO>> {
    let pinnedPosts: Populate<PostMetaData, "author" | "classes" | "levels" | "groups">[] = [];
    let unpinnedPosts: ResponseWithPagination<
      Populate<PostMetaData, "author" | "classes" | "levels" | "groups">
    >;

    const canViewAllPosts = PostService.isUserAllowedToViewAllPosts(userDetails);

    if (canViewAllPosts) {
      if (options.page === 1 && !filter.hashTags && !filter.skipPinned) {
        pinnedPosts = await this.postRepo.findAllPinnedPosts();
        await this.userPostFeedRepo.resetUnseenPostsForUser(userDetails.user._id);
      }

      unpinnedPosts = await this.postRepo.listUnpinnedPosts(
        {
          hashTags: filter.hashTags,
        },
        options,
      );
    } else {
      const userPostFeed = await this.userPostFeedRepo.findPostFeedOfUser(userDetails.user._id);

      if (options.page === 1 && !filter.hashTags && !filter.skipPinned) {
        pinnedPosts = await this.postRepo.findPinnedPostsByPostIds(userPostFeed.posts);
        await this.userPostFeedRepo.resetUnseenPostsForUser(userDetails.user._id);
      }

      unpinnedPosts = await this.postRepo.listUnpinnedPosts(
        { postIds: userPostFeed.posts, hashTags: filter.hashTags },
        options,
      );
    }

    const posts = [...pinnedPosts, ...unpinnedPosts.docs];
    const postIds = posts.map(post => post._id);

    const comments = await this.commentRepo.getCommentsOfPosts(postIds);
    const replies = await this.commentRepo.getRepliesOfPosts(postIds);

    const commentIds = comments.map(comment => comment._id);
    const replyIds = replies.map(reply => reply._id);

    const postReactions = await this.reactionRepo.findReactionsOfPosts(postIds);
    const commentReactions = await this.reactionRepo.findReactionsOfComments([
      ...commentIds,
      ...replyIds,
    ]);

    const postsDTO = posts.map(post => {
      const postComments = comments.filter(
        comment => comment.post === post._id && comment.isReply === false,
      );
      const postReaction = postReactions.find(reaction => reaction.post === post._id) as Reaction;

      const commentsDTO = postComments.map(comment => {
        const commentReplies = replies.filter(reply => reply.parentComment === comment._id);
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
          commentReaction,
          commentReplies: repliesDTO,
          userId: userDetails.user._id,
        });
      });

      return PostMapper.toPostDTO({
        post,
        postReaction,
        comments: commentsDTO,
        school: this.school,
        userId: userDetails.user._id,
        includePublisher: canViewAllPosts ? true : false,
      });
    });

    return {
      docs: postsDTO,
      meta: unpinnedPosts.meta,
    };
  }
}
