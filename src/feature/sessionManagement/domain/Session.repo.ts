import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { TSessionStatusEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { TScheduleEntityEnum } from "../../../helpers/constants";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { TTopicTypeEnum } from "../../../helpers/constants";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { TAttendanceEnum } from "./../../../database/schema/pedagogy/session/session.schema";
import { TAttendanceStatusEnum } from "./../../../features/notification/constants/constants";
import { Student } from "./../../students/domain/student.entity";
import { Teacher } from "./../../teachers/domain/teacher.entity";
import { Session, SessionMetaData, TeacherAttendanceStatusEnum } from "./session.entity";

export type enrichedSessionData = Populate<
  SessionMetaData,
  "subjectType" | "subSubjectType" | "group" | "classroom" | "class" | "classGroup"
>;

export type getLatestAttendanceDto = {
  _id: ID;
  newId: string;
  student: Student | null;
  className: string;
  sessionDate: Date;
  status: TAttendanceStatusEnum;
};

export type listCanceledSessionDto = {
  _id: ID;
  newId: string;
  teacher?: Teacher;
  sessionStartDate: Date;
  reasonForCanceling: string;
  className: string;
  topicName: string;
};

export abstract class SessionRepo extends BaseRepo<SessionMetaData> {
  abstract listTeacherSessions(
    filter: {
      teacherId: ID;
      startTime?: Date;
      endTime?: Date;
      attendanceStatus?: TeacherAttendanceStatusEnum;
    },
    list: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SessionMetaData, "class" | "group">>>;

  abstract listSessions(
    filter: {
      search?: string;
      classId?: ID;
      groupIds?: ID[];
      excludeEmptyFiles?: boolean;
      teacherIds?: ID[];
      subjectTypeIds?: ID[];
    },
    list: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<SessionMetaData, "teacher" | "subjectType" | "subSubjectType" | "group">
    >
  >;

  abstract findOnGoingSessionByClassId<
    FieldsToPopulate extends keyof SessionMetaData["populatedFields"] = never,
  >(
    classId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<SessionMetaData, FieldsToPopulate> | null>;

  abstract findNextSession(
    filter: {
      teacherId?: ID;
      classId?: ID;
      groupIds?: ID[];
    },
    schoolId: ID,
  ): Promise<enrichedSessionData | null>;

  abstract deleteManyByClass(classId: ID): Promise<void>;

  abstract deleteManyByGroup(groupId: ID): Promise<void>;

  abstract find(query: {
    classIds?: ID[];
    topicId?: ID;
    topicType?: TTopicTypeEnum;
    status?: TSessionStatusEnum;
  }): Promise<Populate<SessionMetaData>[]>;

  abstract getLastStudentsAttendanceOfSession(
    session: { _id: ID; startTime: Date },
    studentsIds: ID[],
  ): Promise<Record<ID, TAttendanceEnum | null>>;

  abstract updateStudentAttendance(
    session: ID,
    studentId: ID,
    attendance: TAttendanceEnum,
  ): Promise<void>;

  abstract findInProgressSessionByTeacherId(
    teacherId: ID,
    excludedSessionIds?: ID[],
  ): Promise<SessionMetaData["entity"] | null>;

  abstract deleteWaitingSessionByRange(startTime: Date, endTime: Date): Promise<void>;

  abstract updateSessionType(sessionTypeId: ID, sessionType: SessionType): Promise<void>;

  abstract findManyBySessionType(sessionTypeId: ID): Promise<Session[]>;

  abstract findOneByClassroom(classroomId: ID): Promise<Session | null>;

  abstract findTeacherSchedule(
    teacherId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]>;

  abstract getStudentSchedule({
    classId,
    groupIds,
    classGroupId,
    startDate,
    endDate,
  }: {
    classId: ID | null;
    groupIds: ID[];
    classGroupId: ID | null;
    startDate: Date;
    endDate: Date;
  }): Promise<enrichedSessionData[]>;

  abstract findClassroomSchedule(
    classroomId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]>;

  abstract findClassSchedule(
    classId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]>;

  abstract findGroupSchedule(
    groupId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]>;

  abstract deleteWaitingSessionsOfClass(classId: ID): Promise<void>;

  abstract deleteWaitingSessionsOfGroup(groupId: ID): Promise<void>;

  abstract findOverlappingSessionsByRangeAndEntity(
    entity: TScheduleEntityEnum,
    id: ID[],
    range: { startDate: Date; endDate: Date },
  ): Promise<Session[]>;

  abstract getAttendanceStats({
    classIds,
    groupIds,
    dateInterval,
    studentId,
  }: {
    classIds?: ID[];
    groupIds?: ID[];
    dateInterval: { from: Date; to: Date };
    studentId?: ID;
  }): Promise<{ tag: string; percentage: number }[]>;

  abstract getStudentAttendanceStats(
    studentId: ID,
    dateInterval: { from: Date; to: Date },
  ): Promise<{ absent: number; late: number; expelled: number }>;

  abstract getLatestAttendance({
    classIds,
    groupIds,
    dateInterval,
    studentId,
  }: {
    classIds?: ID[];
    groupIds?: ID[];
    dateInterval: { from: Date; to: Date };
    studentId?: ID;
  }): Promise<getLatestAttendanceDto[]>;

  abstract listCanceledSession(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<listCanceledSessionDto[]>;

  abstract getSessionCanceledStats(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<{ tag: string; percentage: number }[]>;

  abstract updatePaidTeacherStatus(teacherId: string, isTeacherPaid: boolean): Promise<void>;
  abstract getTeacherHourDistribution(
    startTime: Date,
    endTime: Date,
    teacherId: ID,
  ): Promise<
    {
      sessionStatus: TSessionStatusEnum;
      totalMinutes: number;
      totalHours: number;
    }[]
  >;
  abstract assignTeacherToSessionGroup(groupId: ID, teacherId: ID): Promise<void>;

  abstract updateTeacherPaymentStatus(
    teacherId: ID,
    dates: {
      startTime: Date;
      endTime: Date;
    },
    isTeacherPaid: boolean,
  ): Promise<void>;

  abstract assignTeacherToWaitingSessionOfSubjectType(
    classId: ID,
    subjectTypeId: ID,
    teacherId: ID,
  ): Promise<void>;

  abstract unAssignTeacherFromWaitingSessionOfSubjectType(
    classId: ID,
    subjectTypeId: ID,
  ): Promise<void>;

  abstract assignTeacherToWaitingSessionOfSubSubjectType(
    classId: ID,
    subSubjectTypeId: ID,
    teacherId: ID,
  ): Promise<void>;

  abstract unAssignTeacherFromWaitingSessionOfSubSubjectType(
    classId: ID,
    subSubjectTypeId: ID,
  ): Promise<void>;
}
