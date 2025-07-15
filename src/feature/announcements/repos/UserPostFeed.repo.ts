import { BaseRepo } from "../../../core/BaseRepo";
import { ID } from "../../../types/BaseEntity";
import { UserPostFeed, UserPostFeedMetaData } from "../domain/userPostFeed.entity";

export abstract class UserPostFeedRepo extends BaseRepo<UserPostFeedMetaData> {
  abstract findPostFeedOfUser(userId: ID): Promise<UserPostFeed>;

  abstract getUnseenPostsNumberForUser(userId: ID): Promise<number>;

  abstract resetUnseenPostsForUser(userId: ID): Promise<void>;

  abstract addPostToFeeds(postId: ID, userIds: ID[]): Promise<void>;

  abstract removePostFromFeeds(postId: ID, userIds: ID[]): Promise<void>;

  abstract deletePostFromAllFeeds(postId: ID): Promise<void>;

  abstract findAllFeedsOfPost(postId: ID): Promise<UserPostFeed[]>;
}
