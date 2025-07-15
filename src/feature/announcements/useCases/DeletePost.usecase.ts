import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { PostRepo } from "../repos/Post.repo";
import { CommentRepo } from "../repos/Comment.repo";
import { deleteManyFile } from "../../../helpers/upload";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { ForbiddenError } from "../../../core/ApplicationErrors";

@injectable()
export class DeletePostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("UserPostFeedRepo") private feedRepo: UserPostFeedRepo,
  ) {}

  async execute(postNewId: string, user: { type: TEndUserEnum; id: ID }): Promise<void> {
    const post = await this.postRepo.findOneByNewIdOrThrow(postNewId, "notFound.post");

    if (user.type !== END_USER_ENUM.ADMIN && user.id !== post.author)
      throw new ForbiddenError("notAllowed.deletePost");

    const allCommentsOfPosts = await this.commentRepo.getAllCommentsAndRepliesOfPosts(post._id);

    const filesToBeDeleted: string[] = [];

    post.attachments.forEach(attachment => {
      filesToBeDeleted.push(attachment.public_id);
    });
    post.media.forEach(media => {
      filesToBeDeleted.push(media.public_id);
    });

    allCommentsOfPosts.forEach(comment => {
      comment.attachments.forEach(attachment => {
        filesToBeDeleted.push(attachment.public_id);
      });
      comment.media.forEach(media => {
        filesToBeDeleted.push(media.public_id);
      });
    });

    await deleteManyFile(filesToBeDeleted);

    await this.postRepo.deleteOneById(post._id);
    await this.commentRepo.deleteManyByIds(allCommentsOfPosts.map(comment => comment._id));
    await this.reactionRepo.deleteOneByPostId(post._id);
    await this.reactionRepo.deleteManyByCommentIds(allCommentsOfPosts.map(comment => comment._id));
    await this.feedRepo.deletePostFromAllFeeds(post._id);
  }
}
