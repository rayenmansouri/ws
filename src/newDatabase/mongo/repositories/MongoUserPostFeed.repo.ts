import { injectable } from "inversify";
import { MongoBaseRepo } from "./MongoBase.repo";
import {
  UserPostFeed,
  UserPostFeedMetaData,
} from "../../../feature/announcements/domain/userPostFeed.entity";
import { inject } from "../../../core/container/TypedContainer";
import { ClientSession, Connection } from "mongoose";
import { UserPostFeedRepo } from "../../../feature/announcements/repos/UserPostFeed.repo";
import { ID } from "../../../types/BaseEntity";
import { InternalError } from "../../../core/ApplicationErrors";

@injectable()
export class MongoUserPostFeedRepo
  extends MongoBaseRepo<UserPostFeedMetaData>
  implements UserPostFeedRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "feed", session);
  }

  async findPostFeedOfUser(userId: ID): Promise<UserPostFeed> {
    const data = await this.model.findOne({ user: userId });

    if (!data) throw new InternalError();

    return data;
  }

  async getUnseenPostsNumberForUser(userId: ID): Promise<number> {
    const data = await this.model.findOne({ user: userId });

    if (!data) throw new InternalError();

    return data.unseenPosts.length;
  }

  async resetUnseenPostsForUser(userId: ID): Promise<void> {
    await this.model.updateOne({ user: userId }, { $set: { unseenPosts: [] } });
  }

  async addPostToFeeds(postId: ID, userIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { user: { $in: userIds } },
      { $push: { posts: postId, unseenPosts: postId } },
    );
  }

  async removePostFromFeeds(postId: ID, userIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { user: { $in: userIds } },
      { $pull: { posts: postId, unseenPosts: postId } },
    );
  }

  async deletePostFromAllFeeds(postId: ID): Promise<void> {
    await this.model.updateMany(
      { posts: postId },
      { $pull: { posts: postId, unseenPosts: postId } },
    );
  }

  async findAllFeedsOfPost(postId: ID): Promise<UserPostFeed[]> {
    return this.model.find({ posts: postId });
  }
}
