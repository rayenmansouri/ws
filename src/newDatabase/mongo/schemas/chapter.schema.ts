import { Types } from "mongoose";
import { Chapter } from "../../../feature/lms/domain/chapter.entity";
import { createMongoSchema } from "../createSchema";

export const mongoChapterSchema = createMongoSchema<Chapter>({
  classType: Types.ObjectId,
  description: { type: String },
  topic: { type: Types.ObjectId, refPath: "topicType" },
  topicType: String,
  attachments: [{ type: Types.ObjectId, ref: "chapterAttachment" }],
  createdBy: Types.ObjectId,
  userType: { type: String },
  name: { type: String },
});
