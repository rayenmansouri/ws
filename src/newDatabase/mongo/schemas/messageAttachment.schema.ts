import { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { MessageAttachment } from "./../../../feature/messages/domain/messageAttachment.entity";

export const mongoMessageAttachmentSchema = createMongoSchema<MessageAttachment>({
  conversation: { type: Types.ObjectId, ref: "conversation" },
  message: { type: Types.ObjectId, ref: "message" },
  public_id: String,
  url: String,
  mimetype: String,
  name: String,
  uploadedAt: Date,
  sizeInByte: Number,
  type: { type: String },
  isDeleted: Boolean,
  deletedAt: Date,
});

mongoMessageAttachmentSchema.index({ conversation: 1, type: 1 });
mongoMessageAttachmentSchema.index({ uploadedAt: -1 });
