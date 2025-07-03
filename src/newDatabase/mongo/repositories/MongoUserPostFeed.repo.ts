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
}
