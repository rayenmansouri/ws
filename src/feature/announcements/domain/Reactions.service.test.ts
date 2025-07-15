import { REACTION_TYPE_ENUM } from "./reaction.entity";
import { ID } from "../../../types/BaseEntity";
import { Reaction } from "./reaction.entity";
import { ReactionService } from "./Reactions.service";

describe("ReactionService", () => {
  describe("getReactionSummary", () => {
    it("Should return only top 3 reaction types and total reaction number", () => {
      const reactions = {
        users: [
          {
            reactionType: REACTION_TYPE_ENUM.LIKE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LIKE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LIKE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LOVE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LOVE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LOVE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LOVE,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LAUGH,
          },
          {
            reactionType: REACTION_TYPE_ENUM.LAUGH,
          },
          {
            reactionType: REACTION_TYPE_ENUM.ANGRY,
          },
        ],
      } as Reaction;

      const reactionSummary = ReactionService.getReactionSummary(reactions);

      expect(reactionSummary.totalReactionNumber).toBe(reactions.users.length);
      expect(reactionSummary.topReactions).toEqual([
        REACTION_TYPE_ENUM.LOVE,
        REACTION_TYPE_ENUM.LIKE,
        REACTION_TYPE_ENUM.LAUGH,
      ]);
    });

    it("Should not return reaction type that has no reaction", () => {
      const reactions = {
        users: [
          {
            reactionType: REACTION_TYPE_ENUM.LIKE,
          },
        ],
      } as Reaction;

      const reactionSummary = ReactionService.getReactionSummary(reactions);

      expect(reactionSummary.totalReactionNumber).toBe(reactions.users.length);
      expect(reactionSummary.topReactions).toEqual([REACTION_TYPE_ENUM.LIKE]);
    });
  });

  describe("getUserReaction", () => {
    it("Should return user reaction type if user has reacted", () => {
      const userId = "userId" as ID;

      const reactions = {
        users: [
          {
            user: userId,
            reactionType: REACTION_TYPE_ENUM.LIKE,
          },
        ],
      } as Reaction;

      const userReaction = ReactionService.getUserReaction(reactions, userId);

      expect(userReaction).toBe(REACTION_TYPE_ENUM.LIKE);
    });

    it("Should return null if user has not reacted", () => {
      const userId = "userId" as ID;
      const reactions = {
        users: [
          {
            user: "anotherUserId",
          },
        ],
      } as Reaction;

      const userReaction = ReactionService.getUserReaction(reactions, userId);

      expect(userReaction).toBeNull();
    });
  });
});
