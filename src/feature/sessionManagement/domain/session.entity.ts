import { GenerateMetaData } from "../../../core/populateTypes";
import {
  TAttendanceEnum,
  TSessionStatusEnum,
} from "../../../database/schema/pedagogy/session/session.schema";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Admin } from "../../admins/domain/admin.entity";
import { Class } from "../../classes/domain/class.entity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { Homework } from "../../homeworks/domain/homework.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";

export type IFile = {
  public_id: string;
  name: string;
  url: string;
  date: Date;
  size: number | null;
  mimeType: string;
};

export type INote = {
  title: string;
  text: string;
  _id: string;
};

export const SESSION_WEEK_ENUM = {
  A: "A",
  B: "B",
} as const;
export type TSessionWeekEnum = (typeof SESSION_WEEK_ENUM)[keyof typeof SESSION_WEEK_ENUM];

export interface IAttendance {
  [studentId: string]: TAttendanceEnum | null;
}
export const TEACHER_ATTENDANCE_STATUS_ENUM = {
  PRESENT: "present",
  ABSENT: "absent",
} as const;
export type TeacherAttendanceStatusEnum =
  (typeof TEACHER_ATTENDANCE_STATUS_ENUM)[keyof typeof TEACHER_ATTENDANCE_STATUS_ENUM];

export type Session = {
  sessionType: SessionType;
  subjectType: ID | null;
  subSubjectType: ID | null;
  teacher: ID | null;
  class: ID | null;
  classroom: ID;
  attendence: IAttendance;
  group: ID | null;
  files: IFile[];
  notes: { title: string; text: string }[];
  sessionSummary: string | null;
  homeworkGiven: ID[];
  homeworkToDo: ID[];
  status: TSessionStatusEnum;
  launchTime: Date | null;
  closeTime: Date | null;
  startTime: Date;
  endTime: Date;
  classGroup: ID | null;
  week: TSessionWeekEnum | null;
  isClosedForced: boolean;
  reasonForCanceling: string | null;
  canceledBy: ID | null;
  isTeacherPaid: boolean;
} & BaseEntity;

export type SessionMetaData = GenerateMetaData<
  Session,
  {
    subjectType: SubjectType;
    subSubjectType: SubSubjectType;
    teacher: Teacher;
    class: Class;
    classroom: Classroom;
    group: Group;
    homeworkGiven: Homework[];
    homeworkToDo: Homework[];
    classGroup: ClassGroup;
    canceledBy: Admin;
  }
>;
