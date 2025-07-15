import { REACTION_TYPE_ENUM, TReactionTypeEnum } from "./reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { Reaction } from "./reaction.entity";

export type ReactionSummary = {
  topReactions: TReactionTypeEnum[];
  totalReactionNumber: number;
};

export class ReactionService {
  static getReactionSummary(reactions: Pick<Reaction, "users">): ReactionSummary {
    const TOP_REACTIONS_LIMIT = 3;

    const reactionCountMap = Object.values(REACTION_TYPE_ENUM).reduce((acc, reactionType) => {
      acc[reactionType] = 0;
      return acc;
    }, {} as Record<TReactionTypeEnum, number>);

    reactions.users.forEach(user => reactionCountMap[user.reactionType]++);

    const rankedReactions = Object.keys(reactionCountMap)
      .filter(reactionType => reactionCountMap[reactionType as TReactionTypeEnum] !== 0)
      .sort(
        (a, b) =>
          reactionCountMap[b as TReactionTypeEnum] - reactionCountMap[a as TReactionTypeEnum],
      ) as TReactionTypeEnum[];

    return {
      topReactions: rankedReactions.slice(0, TOP_REACTIONS_LIMIT),
      totalReactionNumber: reactions.users.length,
    };
  }

  static getUserReaction(reactions: Pick<Reaction, "users">, userId: ID): TReactionTypeEnum | null {
    const userReaction = reactions.users.find(user => user.user === userId);
    return userReaction ? userReaction.reactionType : null;
  }
}
