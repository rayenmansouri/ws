import { Types } from "mongoose";
import { ChapterAttachment } from "../../../feature/lms/domain/chapterAttachment.entity";
import { createMongoSchema } from "../createSchema";
import { chapterAttachmentFileSchema } from "../../../types/entities";

export const mongoChapterAttachmentSchema = createMongoSchema<ChapterAttachment>({
  name: { type: String },
  description: { type: String },
  teacher: { type: Types.ObjectId, ref: "teacher" },
  status: { type: String },
  files: [chapterAttachmentFileSchema],
  classTypes: [{ type: Types.ObjectId, ref: "classType" }],
  subjectTypes: [{ type: Types.ObjectId, ref: "subjectType" }],
  subSubjectTypes: [{ type: Types.ObjectId, ref: "subSubjectType" }],
});
