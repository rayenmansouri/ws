import { Types } from "mongoose";
import { MessageLinks } from "../../../feature/messages/domain/MessageLinks.entity";
import { createMongoSchema } from "../createSchema";

export const mongoMessageLinksSchema = createMongoSchema<MessageLinks>({
  conversation: {
    type: Types.ObjectId,
    ref: "conversation",
    index: true,
  },
  message: {
    type: Types.ObjectId,
    ref: "message",
    index: true,
  },
  urls: [{ type: String }],
  isDeleted: Boolean,
  deletedAt: Date,
});

mongoMessageLinksSchema.index({ conversation: 1, createdAt: -1 });
