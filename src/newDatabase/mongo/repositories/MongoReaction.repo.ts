import { ClientSession, Connection } from "mongoose";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { Reaction, ReactionMetaData } from "../../../feature/announcements/domain/reaction.entity";
import { ReactionRepo } from "../../../feature/announcements/repos/Reaction.repo";
import { TReactionTypeEnum } from "../../../feature/announcements/domain/reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";

export class MongoReactionRepo extends MongoBaseRepo<ReactionMetaData> implements ReactionRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "reaction", session);
  }

  async findReactionsOfPosts(postIds: ID[]): Promise<Reaction[]> {
    const data = await this.model.find({ post: { $in: postIds } });

    return data;
  }

  async findReactionsOfOneComment<
    FieldsToPopulate extends keyof ReactionMetaData["populatedFields"] = never,
  >(
    commentId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<ReactionMetaData, FieldsToPopulate>> {
    const query = this.model.findOne({ comment: commentId });

    if (options?.populate) query.populate(options.populate);

    const data = await query.lean();

    if (!data) throw new InternalError();

    return data as Populate<ReactionMetaData, FieldsToPopulate>;
  }

  async findReactionsOfComments(commentIds: ID[]): Promise<Reaction[]> {
    const data = await this.model.find({ comment: { $in: commentIds } }).session(this.session);

    return data;
  }

  async deleteOneByPostId(postId: ID): Promise<void> {
    await this.model.deleteOne({ post: postId });
  }

  async deleteManyByCommentIds(commentIds: ID[]): Promise<void> {
    await this.model.deleteMany({ comment: { $in: commentIds } });
  }

  async findReactionsOfOnePost<
    FieldsToPopulate extends keyof ReactionMetaData["populatedFields"] = never,
  >(
    postId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<ReactionMetaData, FieldsToPopulate>> {
    const query = this.model.findOne({ post: postId });

    if (options?.populate) query.populate(options.populate);

    const data = await query.lean();

    if (!data) throw new InternalError();

    return data as Populate<ReactionMetaData, FieldsToPopulate>;
  }

  async removeReactionOfUser(reactionId: ID, userId: ID): Promise<void> {
    await this.model.updateOne({ _id: reactionId }, { $pull: { users: { user: userId } } });
  }

  async updateReactionOfUser(
    reactionId: ID,
    userId: ID,
    reactionType: TReactionTypeEnum,
  ): Promise<void> {
    await this.model.updateOne(
      { _id: reactionId, "users.user": userId },
      {
        $set: { "users.$.reactionType": reactionType },
      },
    );
  }

  async addReactionOfUser(
    reactionId: ID,
    reactionDetails: {
      userId: ID;
      userType: TEndUserEnum;
      reactionType: TReactionTypeEnum;
      reactedAt: Date;
    },
  ): Promise<void> {
    await this.model.updateOne(
      { _id: reactionId },
      {
        $push: {
          users: {
            $each: [
              {
                user: reactionDetails.userId,
                reactionType: reactionDetails.reactionType,
                userType: reactionDetails.userType,
                reactedAt: reactionDetails.reactedAt,
              },
            ],
            $position: 0,
          },
        },
      },
    );
  }
}
