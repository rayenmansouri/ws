import { Types } from "mongoose";
import { Issue } from "../../../feature/issues/domain/issue.entity";
import { createMongoSchema } from "../createSchema";
import { newfileSchema } from "./../../../types/entities";

export const mongoIssueSchema = createMongoSchema<Issue>({
  author: { type: Types.ObjectId, refPath: "authorType" },
  authorType: String,
  content: {
    text: String,
    media: [newfileSchema],
    documents: [newfileSchema],
  },
  adminParticipants: [{ type: Types.ObjectId, ref: "admin" }],
  isForwarded: Boolean,
  lastInteractionDate: Date,
  reason: { type: Types.ObjectId, ref: "issueReason" },
  lastInteraction: { type: Types.ObjectId, ref: "interaction" },
  participantViewStatuses: [
    {
      participantType: String,
      isSeen: Boolean,
    },
  ],
  sentAt: Date,
  status: String,
  studentProfile: { type: Types.ObjectId, ref: "studentProfile" },
  targetType: String,
  teacher: { type: Types.ObjectId, ref: "teacher" },
});
