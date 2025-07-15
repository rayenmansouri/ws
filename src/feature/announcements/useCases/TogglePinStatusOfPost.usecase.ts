import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { PostRepo } from "../repos/Post.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { School } from "../../schools/domain/school.entity";

export type PinStatusOfPostRequest = {
  postNewId: string;
};

@injectable()
export class TogglePinStatusOfPostUseCase {
  private readonly MAXIMUM_PINNED_POSTS = 3;

  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("School") private school: School,
  ) {}

  async execute(dto: PinStatusOfPostRequest): Promise<void> {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post");

    const isPinned = post.isPinned;

    if (!isPinned) {
      const allPinnedPosts = await this.postRepo.findAllPinnedPosts();

      if (allPinnedPosts.length >= this.MAXIMUM_PINNED_POSTS)
        throw new BadRequestError("post.maximumPinnedPostsReached");
    }

    await this.postRepo.updateOneById(post._id, {
      isPinned: !isPinned,
      pinnedAt: !isPinned === true ? getCurrentTimeOfSchool(this.school._id) : null,
    });

    return;
  }
}
