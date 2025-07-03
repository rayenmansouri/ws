import { Schema, Types } from "mongoose";
import { Comment } from "../../../feature/announcements/domain/comment.entity";
import { createMongoSchema } from "../createSchema";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";

export const mongoCommentSchema = createMongoSchema<Comment>({
  content: String,
  attachments: [fileSchema],
  media: [fileSchema],
  reactions: Schema.Types.Mixed,
  publishedAt: Date,
  post: { type: Types.ObjectId, ref: "post" },
  isReply: Boolean,
  parentComment: { type: Types.ObjectId, ref: "comment" },
  user: { type: Types.ObjectId, refPath: "userType" },
  userType: String,
});
