import { Schema, Types } from "mongoose";
import { Post } from "../../../feature/announcements/domain/post.entity";
import { createMongoSchema } from "../createSchema";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";

export const mongoPostSchema = createMongoSchema<Post>({
  content: String,
  media: [fileSchema],
  attachments: [fileSchema],
  reactions: Schema.Types.Mixed,
  publishedAt: Date,
  isPublished: Boolean,
  audiences: {
    //@ts-ignore
    type: [{ type: String, userTypes: [{ type: String }] }],
  },
  author: { type: Types.ObjectId, refPath: "authorType" },
  authorType: String,
  category: String,
  levels: [{ type: Types.ObjectId, ref: "level" }],
  classes: [{ type: Types.ObjectId, ref: "class" }],
  groups: [{ type: Types.ObjectId, ref: "group" }],
  isScheduled: Boolean,
  scheduledAt: Date,
  isCommentsAllowed: Boolean,
  isPinned: Boolean,
  pinnedAt: Date,
  hashTags: [{ type: String }],
});
