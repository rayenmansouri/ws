import { Types } from "mongoose";
import { Message } from "../../../feature/messages/domain/message.entity";
import { createMongoSchema } from "../createSchema";

export const mongoMessageSchema = createMongoSchema<Message>({
  conversation: {
    type: Types.ObjectId,
    ref: "conversation",
    index: true,
  },
  sender: {
    type: Types.ObjectId,
    refPath: "senderType",
    index: true,
  },
  senderType: String,
  content: String,
  replyTo: { type: Types.ObjectId, ref: "message" },
  sentAt: {
    type: Date,
    index: true,
  },
  files: [{ type: Types.ObjectId, ref: "messageAttachment" }],
  media: [{ type: Types.ObjectId, ref: "messageAttachment" }],
  links: { type: Types.ObjectId, ref: "messageLinks" },
  reactions: [
    {
      reactionType: String,
      user: { type: Types.ObjectId, refPath: "userType" },
      userType: String,
      reactedAt: Date,
    },
  ],
  isDeleted: Boolean,
});

mongoMessageSchema.index({ conversation: 1, createdAt: -1 });

mongoMessageSchema.index({ conversation: 1, sender: 1, createdAt: -1 });
