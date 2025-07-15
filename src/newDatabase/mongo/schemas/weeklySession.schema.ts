import { Types } from "mongoose";
import { WeeklySession } from "../../../feature/weeklySessions/domains/weeklySession.entity";
import { createMongoSchema } from "../createSchema";

export const mongoWeeklySessionSchema = createMongoSchema<WeeklySession>({
  sessionType: { type: Types.ObjectId, ref: "sessionType" },
  subjectType: { type: Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
  group: { type: Types.ObjectId, ref: "group" },
  startTime: { day: Number, timeStamps: Number },
  endTime: { day: Number, timeStamps: Number },
  teacher: { type: Types.ObjectId, ref: "teacher" },
  class: { type: Types.ObjectId, ref: "class" },
  classroom: { type: Types.ObjectId, ref: "classroom" },
  classGroup: { type: Types.ObjectId, ref: "classGroup" },
  week: { type: String },
  isDraft: Boolean,
});
