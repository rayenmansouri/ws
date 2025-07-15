import { Types } from "mongoose";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";
import { Comment } from "../../../feature/announcements/domain/comment.entity";
import { createMongoSchema } from "../createSchema";

export const mongoCommentSchema = createMongoSchema<Comment>({
  content: String,
  attachments: [fileSchema],
  media: [fileSchema],
  publishedAt: Date,
  post: { type: Types.ObjectId, ref: "post" },
  isReply: Boolean,
  parentComment: { type: Types.ObjectId, ref: "comment" },
  user: { type: Types.ObjectId, refPath: "userType" },
  userType: String,
});
