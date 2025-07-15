import { Types } from "mongoose";
import { SmartCalendarSession } from "../../../feature/smartCalendar/domain/smartCalendarSession.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSmartCalendarSessionSchema = createMongoSchema<SmartCalendarSession>({
  smartCalendarSchedule: { type: Types.ObjectId, ref: "smartCalendarSchedule" },
  class: { type: Types.ObjectId, ref: "class" },
  group: { type: Types.ObjectId, ref: "group" },
  sessionType: { type: Types.ObjectId, ref: "sessionType" },
  subjectType: { type: Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: Types.ObjectId, ref: "subSubjectType" },
  teacher: { type: Types.ObjectId, ref: "teacher" },
  week: String,
  classGroup: { type: Types.ObjectId, ref: "classGroup" },
  startTime: { day: Number, timeStamps: Number },
  endTime: { day: Number, timeStamps: Number },
  classroom: { type: Types.ObjectId, ref: "classroom" },
});
