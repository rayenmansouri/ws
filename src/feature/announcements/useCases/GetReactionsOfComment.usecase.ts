import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { ReactionsDTO } from "../dtos/reactions.dto";
import { CommentRepo } from "../repos/Comment.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { ReactionsMapper } from "../mappers/Reactions.mapper";

export type GetReactionsOfCommentRequest = {
  commentNewId: string;
  userDetails: IsUserAllowedToViewAllPostsParams;
};

@injectable()
export class GetReactionsOfCommentUseCase {
  constructor(
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
  ) {}

  async execute(dto: GetReactionsOfCommentRequest): Promise<ReactionsDTO> {
    const comment = await this.commentRepo.findOneByNewIdOrThrow(
      dto.commentNewId,
      "notFound.comment",
      {
        populate: ["post"],
      },
    );

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, comment.post._id))
        throw new ForbiddenError();
    }

    const reactions = await this.reactionRepo.findReactionsOfOneComment(comment._id, {
      populate: ["users.user"],
    });

    return ReactionsMapper.toDTO(reactions);
  }
}
