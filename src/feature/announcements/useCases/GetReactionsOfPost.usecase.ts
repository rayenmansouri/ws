import { injectable } from "inversify";
import { ReactionsDTO } from "../dtos/reactions.dto";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { PostRepo } from "../repos/Post.repo";
import { inject } from "../../../core/container/TypedContainer";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { ReactionsMapper } from "../mappers/Reactions.mapper";

export type ReactionsOfPostRequest = {
  postNewId: string;
  userDetails: IsUserAllowedToViewAllPostsParams;
};

@injectable()
export class GetReactionsOfPostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
  ) {}

  async execute(dto: ReactionsOfPostRequest): Promise<ReactionsDTO> {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post");

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, post._id)) throw new ForbiddenError();
    }

    const reactions = await this.reactionRepo.findReactionsOfOnePost(post._id, {
      populate: ["users.user"],
    });

    return ReactionsMapper.toDTO(reactions);
  }
}
