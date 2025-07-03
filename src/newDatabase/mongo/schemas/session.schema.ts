import mongoose, { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { mongoSessionTypeSchema } from "./sessionType.schema";
import { Session } from "../../../feature/sessionManagement/domain/session.entity";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";

export const mongoSessionSchema = createMongoSchema<Session>({
  sessionType: mongoSessionTypeSchema,
  subjectType: { type: Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
  startTime: Date,
  endTime: Date,
  teacher: { type: Types.ObjectId, ref: "teacher" },
  class: { type: Types.ObjectId, ref: "class" },
  classroom: { type: Types.ObjectId, ref: "classroom" },
  attendence: { type: mongoose.Schema.Types.Mixed },
  group: { type: Types.ObjectId, ref: "group" },
  files: [fileSchema],
  notes: [{ title: String, text: String }],
  sessionSummary: String,
  homeworkGiven: [{ type: Types.ObjectId, ref: "homework" }],
  homeworkToDo: [{ type: Types.ObjectId, ref: "homework" }],
  status: { type: String },
  launchTime: Date,
  closeTime: Date,
  classGroup: { type: Types.ObjectId, ref: "classGroup" },
  week: String,
  isClosedForced: { type: Boolean },
  reasonForCanceling: { type: String },
  canceledBy: { type: Types.ObjectId, ref: "admin" },
  isTeacherPaid: { type: Boolean },
});
