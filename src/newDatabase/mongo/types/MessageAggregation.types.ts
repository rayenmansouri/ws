import { TEndUserEnum } from "../../../constants/globalEnums";
import { TReactionTypeEnum } from "../../../feature/announcements/domain/reaction.entity";
import { ID } from "../../../types/BaseEntity";

export type FacetPipelineStage =
  | {
      $match: {
        "lastMessage.senderType": string;
      };
    }
  | {
      $lookup: {
        from: string;
        let: { senderId: string };
        pipeline: Array<
          | {
              $match: {
                $expr: { $eq: [string, string] };
                isDeleted: { $ne: boolean };
              };
            }
          | {
              $project: { fullName: 1; avatar: 1 };
            }
        >;
        as: string;
      };
    }
  | {
      $set: {
        senderInfo: {
          $cond: {
            if: { $eq: [{ $size: string }, number] };
            then: null;
            else: { $first: string };
          };
        };
      };
    };

export type ReactionAddOperation = {
  $push: {
    reactions: {
      $each: Array<{
        user: ID;
        reactionType: TReactionTypeEnum;
        userType: TEndUserEnum;
        reactedAt: Date;
      }>;
      $position: number;
    };
  };
};

export type ReactionRemoveOperation = {
  $pull: {
    reactions: {
      user: ID;
    };
  };
};

export type ReactionUpdateOperation = {
  $set: {
    "reactions.$.reactionType": TReactionTypeEnum;
  };
};

export type MessageTypeCondition = {
  $cond: {
    if: {
      $or: Array<{
        $gt: [{ $size: string }, number];
      }>;
    };
    then: string;
    else: string;
  };
};

export type SenderLookupOperation = Record<string, FacetPipelineStage[]>;
