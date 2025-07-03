import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

interface WeeklySessionDate {
  day: number;
  timeStamps: number;
}

export interface IWeeklySession extends IEntity {
  sessionType: ObjectId;
  subjectType: ObjectId;
  subSubjectType: ObjectId;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  group: ObjectId;
  teacher: ObjectId;
  class: ObjectId;
  classroom: ObjectId;
  classGroup: ObjectId | null;
  week: string;
  isDraft: boolean;
}

export const weeklySessionSchema = createSchema<IWeeklySession>({
  sessionType: { type: mongoose.Types.ObjectId, ref: "sessionType" },
  subjectType: { type: mongoose.Types.ObjectId, ref: "subjectType" },
  subSubjectType: { type: mongoose.Types.ObjectId, ref: "subSubjectType" },
  group: { type: mongoose.Types.ObjectId, ref: "group" },
  startTime: { day: Number, timeStamps: Number },
  endTime: { day: Number, timeStamps: Number },
  teacher: { type: mongoose.Types.ObjectId, ref: "teacher" },
  class: { type: mongoose.Types.ObjectId, ref: "class" },
  classroom: { type: mongoose.Types.ObjectId, ref: "classroom" },
  classGroup: { type: mongoose.Types.ObjectId, ref: "classGroup", default: undefined },
  week: { type: String, default: undefined },
  isDraft: Boolean,
});
