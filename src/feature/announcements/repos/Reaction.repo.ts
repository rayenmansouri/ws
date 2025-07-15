import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { Reaction, ReactionMetaData } from "../domain/reaction.entity";

export abstract class ReactionRepo extends BaseRepo<ReactionMetaData> {
  abstract findReactionsOfOnePost<
    FieldsToPopulate extends keyof ReactionMetaData["populatedFields"] = never,
  >(
    postId: ID,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<ReactionMetaData, FieldsToPopulate>>;

  abstract findReactionsOfPosts(postIds: ID[]): Promise<Reaction[]>;

  abstract findReactionsOfOneComment<
    FieldsToPopulate extends keyof ReactionMetaData["populatedFields"] = never,
  >(
    commentId: ID,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<ReactionMetaData, FieldsToPopulate>>;

  abstract findReactionsOfComments(commentIds: ID[]): Promise<Reaction[]>;

  abstract deleteOneByPostId(postId: ID): Promise<void>;

  abstract deleteManyByCommentIds(commentIds: ID[]): Promise<void>;

  abstract removeReactionOfUser(reactionId: ID, userId: ID): Promise<void>;

  abstract updateReactionOfUser(
    reactionId: ID,
    userId: ID,
    reactionType: TReactionTypeEnum,
  ): Promise<void>;

  abstract addReactionOfUser(
    reactionId: ID,
    reactionDetails: {
      userId: ID;
      userType: TEndUserEnum;
      reactionType: TReactionTypeEnum;
      reactedAt: Date;
    },
  ): Promise<void>;
}
