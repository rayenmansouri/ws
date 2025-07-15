import { IAttendance, IFile } from "../../../../feature/sessionManagement/domain/session.entity";
import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { ISessionType, sessionTypeSchema } from "./sessionType.schema";

export const SESSION_STATUS_ENUM = {
  WAITING: "waiting",
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;
export type TSessionStatusEnum = (typeof SESSION_STATUS_ENUM)[keyof typeof SESSION_STATUS_ENUM];

export const ATTENDANCE_ENUM = {
  EXPELLED: "expelled",
  PRESENT: "present",
  LATE: "late",
  ABSENT: "absent",
} as const;
export type TAttendanceEnum = (typeof ATTENDANCE_ENUM)[keyof typeof ATTENDANCE_ENUM];

export type sessionStatus = keyof typeof SESSION_STATUS_ENUM;

export interface INote {
  title: string;
  text: string;
  _id: string;
}
export interface ISession extends IEntity {
  sessionType: ISessionType;
  subjectType: ObjectId;
  subSubjectType: ObjectId;
  teacher: ObjectId;
  class: ObjectId;
  classroom: ObjectId;
  attendence: IAttendance;
  group: ObjectId;
  files: IFile[];
  notes: INote[];
  sessionSummary: string;
  homeworkGiven: ObjectId[];
  homeworkToDo: ObjectId[];
  status: TSessionStatusEnum;
  launchTime: Date;
  closeTime: Date;
  startTime: Date;
  endTime: Date;
  classGroup: ObjectId | null;
  week: "A" | "B" | undefined;
  newId: string;
  isClosedForced: boolean;
  reasonForCanceling: string | null;
  canceledBy: ObjectId;
  isTeacherPaid: boolean;
}

export const sessionSchema = createSchema<ISession>(
  {
    sessionType: sessionTypeSchema,
    subjectType: {
      type: mongoose.Types.ObjectId,
      ref: "subjectType",
    },
    subSubjectType: {
      type: mongoose.Types.ObjectId,
      ref: "subSubjectType",
    },
    startTime: Date,
    endTime: Date,
    teacher: { type: mongoose.Types.ObjectId, ref: "teacher" },
    class: { type: mongoose.Types.ObjectId, ref: "class" },
    classroom: { type: mongoose.Types.ObjectId, ref: "classroom" },
    attendence: { type: Object, default: {} },
    group: { type: mongoose.Types.ObjectId, ref: "group" },
    files: [{ public_id: String, name: String, url: String, date: Date, default: [] }],
    notes: [{ title: String, text: String, default: [] }],
    sessionSummary: String,
    homeworkGiven: [{ type: mongoose.Types.ObjectId, ref: "homework" }],
    homeworkToDo: [{ type: mongoose.Types.ObjectId, ref: "homework" }],
    status: { type: String, enum: ["waiting", "inProgress", "completed", "canceled"] },
    launchTime: Date,
    closeTime: Date,
    classGroup: { type: mongoose.Types.ObjectId, ref: "classGroup" },
    week: String,
    isClosedForced: { type: Boolean, default: false },
    reasonForCanceling: { type: String, default: null },
    canceledBy: { type: mongoose.Types.ObjectId, ref: "admin" },
    isTeacherPaid: { type: Boolean, default: false },
  },
  { minimize: false },
);
