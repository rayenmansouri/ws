import { Types } from "mongoose";
import { UserPostFeed } from "../../../feature/announcements/domain/userPostFeed.entity";
import { createMongoSchema } from "../createSchema";

export const mongoUserPostFeedSchema = createMongoSchema<UserPostFeed>({
  user: { type: Types.ObjectId },
  userType: String,
  posts: [{ type: Types.ObjectId, ref: "post" }],
  unseenPosts: [{ type: Types.ObjectId, ref: "post" }],
});
