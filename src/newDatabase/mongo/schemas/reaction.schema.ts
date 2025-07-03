import { Types } from "mongoose";
import { Reaction } from "../../../feature/announcements/domain/reaction.entity";
import { createMongoSchema } from "../createSchema";

export const mongoReactionSchema = createMongoSchema<Reaction>({
  comment: { type: Types.ObjectId, ref: "comment" },
  post: { type: Types.ObjectId, ref: "post" },
  users: [
    {
      user: { type: Types.ObjectId, refPath: "userType" },
      userType: String,
      reactionType: String,
      reactedAt: Date,
    },
  ],
});
