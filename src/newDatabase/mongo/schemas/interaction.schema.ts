import { Types } from "mongoose";
import { Interaction } from "../../../feature/issues/domain/interaction.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "./../../../types/entities";

export const mongoInteractionSchema = createMongoSchema<Interaction>({
  interactionType: String,
  issue: { type: Types.ObjectId, ref: "issue" },
  sentAt: Date,
  sender: { type: Types.ObjectId, refPath: "senderType" },
  senderType: String,
  action: String,
  actor: { type: Types.ObjectId, refPath: "actorType" },
  actorType: String,
  target: { type: Types.ObjectId, refPath: "targetType" },
  targetType: String,
  content: {
    text: String,
    documents: [newfileSchema],
    media: [newfileSchema],
  },
});
