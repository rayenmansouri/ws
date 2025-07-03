import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Reaction, ReactionMetaData } from "../../../feature/announcements/domain/reaction.entity";
import { ReactionRepo } from "../../../feature/announcements/repos/Reaction.repo";
import { ID } from "../../../types/BaseEntity";

export class MongoReactionRepo extends MongoBaseRepo<ReactionMetaData> implements ReactionRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "reaction", session);
  }

  async getReactionsOfPosts(postIds: ID[]): Promise<Reaction[]> {
    const data = await this.model.find({ post: { $in: postIds } });

    return data;
  }

  async getReactionsOfComments(commentIds: ID[]): Promise<Reaction[]> {
    const data = await this.model.find({ comment: { $in: commentIds } });

    return data;
  }
}
