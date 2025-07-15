import moment from "moment";
import { ClientSession, Connection, FilterQuery, PipelineStage } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Populate } from "../../../core/populateTypes";
import { TTopicTypeEnum } from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";
import {
  Session,
  SessionMetaData,
  TEACHER_ATTENDANCE_STATUS_ENUM,
  TeacherAttendanceStatusEnum,
} from "../../../feature/sessionManagement/domain/session.entity";
import {
  enrichedSessionData,
  SessionRepo,
} from "../../../feature/sessionManagement/domain/Session.repo";
import { SessionType } from "../../../feature/sessionTypes/domains/sessionType.entity";
import { TScheduleEntityEnum } from "../../../helpers/constants";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import {
  ATTENDANCE_ENUM,
  SESSION_STATUS_ENUM,
  TAttendanceEnum,
  TSessionStatusEnum,
} from "./../../../database/schema/pedagogy/session/session.schema";
import {
  getLatestAttendanceDto,
  listCanceledSessionDto,
} from "./../../../feature/sessionManagement/domain/Session.repo";
import { stringToObjectId } from "./../../../helpers/functions";
import { stringsToObjectIds } from "./../../../helpers/stringToObjectId";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoSessionRepo extends MongoBaseRepo<SessionMetaData> implements SessionRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "session", session);
  }

  async unAssignTeacherFromWaitingSessionOfSubSubjectType(
    classId: ID,
    subSubjectTypeId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subSubjectType: subSubjectTypeId, status: SESSION_STATUS_ENUM.WAITING },
      { teacher: null },
      { session: this.session },
    );
  }

  async unAssignTeacherFromWaitingSessionOfSubjectType(classId: ID, teacherId: ID): Promise<void> {
    await this.model.updateMany(
      { class: classId, teacher: teacherId, status: SESSION_STATUS_ENUM.WAITING },
      { teacher: null },
      { session: this.session },
    );
  }

  async listSessions(
    filter: {
      search?: string;
      classId?: ID;
      groupIds?: ID[];
      excludeEmptyFiles?: boolean;
      teacherIds?: ID[];
      subjectTypeIds?: ID[];
    },
    option: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<SessionMetaData, "teacher" | "subSubjectType" | "subjectType" | "group">
    >
  > {
    const filterQuery: FilterQuery<Session> = {
      $or: [],
    };

    if (filter.classId) filterQuery.$or?.push({ class: filter.classId });

    if (filter.groupIds && filter.groupIds.length > 0)
      filterQuery.$or?.push({ group: { $in: filter.groupIds } });

    if (filter.search) filterQuery["files.name"] = { $regex: filter.search, $options: "i" };

    if (filter.excludeEmptyFiles === true) filterQuery.files = { $exists: true, $ne: [] };

    if (filter.teacherIds && filter.teacherIds.length > 0)
      filterQuery.teacher = { $in: filter.teacherIds };

    if (filter.subjectTypeIds && filter.subjectTypeIds.length > 0)
      filterQuery.subjectType = { $in: filter.subjectTypeIds };

    const data = await this.findManyWithPagination(filterQuery, {
      ...option,
      populate: ["teacher", "subSubjectType", "subjectType", "group"],
    });

    return data;
  }

  async findOnGoingSessionByClassId<
    FieldsToPopulate extends keyof SessionMetaData["populatedFields"] = never,
  >(
    classId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<SessionMetaData, FieldsToPopulate> | null> {
    const filterQuery: FilterQuery<Session> = {
      class: classId,
      status: SESSION_STATUS_ENUM.IN_PROGRESS,
    };

    return this.model
      .findOne(filterQuery)
      .populate<SessionMetaData["populatedFields"]>(options?.populate || [])
      .lean();
  }

  async assignTeacherToWaitingSessionOfSubSubjectType(
    classId: ID,
    subSubjectTypeId: ID,
    teacherId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subSubjectType: subSubjectTypeId, status: SESSION_STATUS_ENUM.WAITING },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async findOverlappingSessionsByRangeAndEntity(
    entity: TScheduleEntityEnum,
    ids: ID[],
    range: { startDate: Date; endDate: Date },
  ): Promise<Session[]> {
    const start = range.startDate;
    const end = range.endDate;
    const filterQuery: FilterQuery<Session> = {
      [entity]: { $in: ids },
      $or: [
        { startTime: { $gte: start, $lt: end } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lt: start }, endTime: { $gt: end } },
      ],
    };

    return this.model.find(filterQuery).lean();
  }

  async deleteWaitingSessionsOfClass(classId: ID): Promise<void> {
    const filterQuery: FilterQuery<Session> = {
      status: SESSION_STATUS_ENUM.WAITING,
      class: classId,
    };

    await this.model.deleteMany(filterQuery).session(this.session);
  }

  async deleteWaitingSessionsOfGroup(groupId: ID): Promise<void> {
    const filterQuery: FilterQuery<Session> = {
      status: SESSION_STATUS_ENUM.WAITING,
      group: groupId,
    };

    await this.model.deleteMany(filterQuery).session(this.session);
  }

  async findTeacherSchedule(
    teacherId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]> {
    return this.model
      .find({
        teacher: teacherId,
        startTime: { $gte: range.startDate },
        endTime: { $lte: range.endDate },
      })
      .populate("subjectType subSubjectType group classroom class classGroup")
      .lean();
  }

  async getStudentSchedule({
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
  }): Promise<enrichedSessionData[]> {
    if (!classId && !classGroupId) return [];

    const query: FilterQuery<Session> = {
      startTime: { $gte: startDate },
      endTime: { $lte: endDate },
    };

    if (classId || classGroupId || groupIds.length > 0) {
      query.$or = [];

      if (groupIds.length > 0) query.$or.push({ group: { $in: groupIds } });

      if (classId) query.$or.push({ class: classId, classGroup: null });

      if (classGroupId) query.$or.push({ class: classId, classGroup: classGroupId });
    }

    return this.model
      .find(query)
      .populate("subjectType subSubjectType group classroom class classGroup");
  }

  findClassroomSchedule(
    classroomId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]> {
    return this.model
      .find({
        classroom: classroomId,
        startTime: { $gte: range.startDate },
        endTime: { $lte: range.endDate },
      })
      .populate("subjectType subSubjectType group classroom class classGroup")
      .lean();
  }

  findClassSchedule(
    classId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]> {
    return this.model
      .find({
        class: classId,
        startTime: { $gte: range.startDate },
        endTime: { $lte: range.endDate },
      })
      .populate("subjectType subSubjectType group classroom class classGroup")
      .lean();
  }

  async findGroupSchedule(
    groupId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<enrichedSessionData[]> {
    return this.model
      .find({
        group: groupId,
        startTime: { $gte: range.startDate },
        endTime: { $lte: range.endDate },
      })
      .populate("subjectType subSubjectType group classroom class classGroup")
      .lean();
  }

  async findOneByClassroom(classroomId: ID): Promise<Session | null> {
    return this.model.findOne({ classroom: classroomId }).lean();
  }

  async findManyBySessionType(sessionTypeId: ID): Promise<Session[]> {
    return this.model.find({ "sessionType._id": sessionTypeId }).lean();
  }

  async updateSessionType(sessionTypeId: ID, sessionType: SessionType): Promise<void> {
    await this.model
      .updateMany({ "sessionType._id": sessionTypeId }, { sessionType })
      .session(this.session);
  }

  async deleteWaitingSessionByRange(startTime: Date, endDate: Date): Promise<void> {
    await this.model.deleteMany({
      status: SESSION_STATUS_ENUM.WAITING,
      startTime: { $gte: startTime },
      endTime: { $lte: endDate },
    });
  }

  async find(
    filter: {
      classIds?: ID[];
      topicId?: ID;
      topicType?: TTopicTypeEnum;
      status?: TSessionStatusEnum;
    } & (
      | { topicId: ID; topicType: TTopicTypeEnum }
      | { topicId?: undefined; topicType?: undefined }
    ),
  ): Promise<Populate<SessionMetaData, "homeworkGiven" | "homeworkToDo">[]> {
    const { classIds, topicId, topicType, status } = filter;

    const query: FilterQuery<Session> = {};

    if (classIds) query.class = { $in: classIds };
    if (topicId && topicType) query[topicType] = topicId;
    if (status) query.status = status;

    return this.model.find(query).populate("homeworkGiven homeworkToDo").lean();
  }

  async listTeacherSessions(
    filter: {
      teacherId: ID;
      startTime?: Date;
      endTime?: Date;
      attendanceStatus?: TeacherAttendanceStatusEnum;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SessionMetaData, "class" | "group">>> {
    const filterQuery: FilterQuery<Session> = {
      teacher: filter.teacherId,
    };

    if (filter.startTime) filterQuery.startTime = { $gte: filter.startTime };

    if (filter.endTime) filterQuery.endTime = { $lte: filter.endTime };

    if (!filter.attendanceStatus)
      filterQuery.status = {
        $in: [SESSION_STATUS_ENUM.COMPLETED, SESSION_STATUS_ENUM.CANCELED],
      };

    if (filter.attendanceStatus === TEACHER_ATTENDANCE_STATUS_ENUM.ABSENT)
      filterQuery.status = SESSION_STATUS_ENUM.CANCELED;

    if (filter.attendanceStatus === TEACHER_ATTENDANCE_STATUS_ENUM.PRESENT)
      filterQuery.status = SESSION_STATUS_ENUM.COMPLETED;

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["class", "group"],
    });

    return data;
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }

  async getLastStudentsAttendanceOfSession(
    session: { _id: ID; startTime: Date },
    studentsIds: ID[],
  ): Promise<Record<ID, TAttendanceEnum | null>> {
    const studentsLastAttendance = await this.model.aggregate<{
      studentId: ID;
      attendance: TAttendanceEnum | null;
    }>(
      [
        {
          $match: {
            _id: { $ne: stringToObjectId(session._id) },
            status: { $in: [SESSION_STATUS_ENUM.COMPLETED, SESSION_STATUS_ENUM.IN_PROGRESS] },
            startTime: { $lt: session.startTime },
            $expr: {
              $gt: [
                {
                  $size: {
                    $filter: {
                      input: { $objectToArray: { $ifNull: ["$attendence", {}] } },
                      as: "sessionAttendance",
                      cond: { $in: ["$$sessionAttendance.k", studentsIds] },
                    },
                  },
                },
                0,
              ],
            },
          },
        },
        {
          $project: {
            attendance: { $objectToArray: "$attendence" },
            startTime: 1,
          },
        },
        { $unwind: "$attendance" },
        {
          $match: {
            "attendance.k": {
              $in: studentsIds,
            },
          },
        },
        {
          $sort: { startTime: -1 },
        },
        {
          $group: {
            _id: "$attendance.k",
            lastAttendance: {
              $first: "$attendance.v",
            },
            lastSessionTime: {
              $first: "$startTime",
            },
          },
        },
        {
          $project: {
            _id: 0,
            studentId: "$_id",
            attendance: "$lastAttendance",
          },
        },
      ],
      { session: this.session },
    );

    const attendance = studentsLastAttendance.reduce((acc, { studentId, attendance }) => {
      acc[studentId] = attendance;
      return acc;
    }, {} as Record<ID, TAttendanceEnum | null>);

    return attendance;
  }

  async findNextSession(
    filter: { teacherId?: ID; classId?: ID; groupIds?: ID[] },
    schoolId: ID,
  ): Promise<Populate<
    SessionMetaData,
    "subjectType" | "subSubjectType" | "group" | "classroom" | "class" | "classGroup"
  > | null> {
    if (!filter.teacherId && !filter.classId && !filter.groupIds) return null;

    const filterQuery: FilterQuery<Session>[] = [];
    if (filter.teacherId) filterQuery.push({ teacher: filter.teacherId });

    if (filter.classId) filterQuery.push({ class: filter.classId });

    if (filter.groupIds) filterQuery.push({ group: { $in: filter.groupIds } });

    const currentSession = (await this.model
      .findOne({
        $or: filterQuery,
        status: SESSION_STATUS_ENUM.IN_PROGRESS,
      })
      .populate("subjectType subSubjectType group classroom class classGroup")) as Populate<
      SessionMetaData,
      "subjectType" | "subSubjectType" | "group" | "classroom" | "class" | "classGroup"
    > | null;
    if (currentSession) return currentSession;

    const currentTime = getCurrentTimeOfSchool(schoolId);
    const startTimeInDay = moment(currentTime).startOf("day").toDate();
    const lastTimeInDay = moment(currentTime).endOf("day").toDate();

    const nextSession = (
      await this.model
        .find({
          ...filterQuery,
          status: SESSION_STATUS_ENUM.WAITING,
          startTime: { $gte: startTimeInDay },
          endTime: { $lte: lastTimeInDay },
        })
        .sort({ startTime: 1 })
        .limit(1)
        .populate("subjectType subSubjectType group classroom class classGroup")
    )[0] as unknown as
      | Populate<
          SessionMetaData,
          "subjectType" | "subSubjectType" | "group" | "classroom" | "class" | "classGroup"
        >
      | undefined;

    if (nextSession) return nextSession;

    return null;
  }

  async updateStudentAttendance(
    sessionId: ID,
    studentId: ID,
    attendance: TAttendanceEnum,
  ): Promise<void> {
    await this.model.updateOne(
      {
        _id: sessionId,
      },
      { $set: { [`attendence.${studentId}`]: attendance } },
      { session: this.session },
    );
  }

  async findInProgressSessionByTeacherId(
    teacherId: ID,
    excludedSessionIds: ID[],
  ): Promise<SessionMetaData["entity"] | null> {
    return await this.model.findOne({
      _id: { $nin: excludedSessionIds },
      teacher: teacherId,
      status: SESSION_STATUS_ENUM.IN_PROGRESS,
    });
  }

  async getAttendanceStats({
    groupIds,
    classIds,
    dateInterval,
    studentId,
  }: {
    groupIds?: ID[];
    classIds?: ID[];
    dateInterval: {
      from: Date;
      to: Date;
    };
    studentId?: ID;
  }): Promise<{ tag: string; percentage: number }[]> {
    const pipeline: PipelineStage[] = [];

    const matchQuery: FilterQuery<Session> = {
      startTime: {
        $gte: dateInterval.from,
        $lte: dateInterval.to,
      },
    };

    if (classIds || groupIds) {
      const orQuery: FilterQuery<Session>[] = [];
      if (classIds) orQuery.push({ class: { $in: stringsToObjectIds(classIds) } });
      if (groupIds) orQuery.push({ group: { $in: stringsToObjectIds(groupIds) } });
      matchQuery.$or = orQuery;
    }

    pipeline.push({ $match: matchQuery });

    pipeline.push(
      {
        $project: {
          attendanceArray: { $objectToArray: "$attendence" },
        },
      },
      { $unwind: "$attendanceArray" },
      {
        $match: {
          ...(studentId ? { "attendanceArray.k": studentId } : {}),
        },
      },
      {
        $group: {
          _id: "$attendanceArray.v",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          types: {
            $push: {
              tag: "$_id",
              count: "$count",
            },
          },
          totalCount: { $sum: "$count" },
        },
      },
      { $unwind: "$types" },
      {
        $project: {
          _id: 0,
          tag: "$types.tag",
          percentage: {
            $multiply: [{ $divide: ["$types.count", "$totalCount"] }, 100],
          },
        },
      },
    );

    const attendanceStats = await this.model.aggregate<{ tag: string; percentage: number }>(
      pipeline,
    );
    return attendanceStats;
  }

  async getLatestAttendance({
    classIds,
    groupIds,
    dateInterval,
    studentId,
  }: {
    classIds?: ID[];
    groupIds?: ID[];
    dateInterval: { from: Date; to: Date };
    studentId?: ID;
  }): Promise<getLatestAttendanceDto[]> {
    const matchQuery: FilterQuery<Session> = {
      startTime: {
        $gte: dateInterval.from,
        $lte: dateInterval.to,
      },
    };

    if (classIds || groupIds) {
      const orQuery: FilterQuery<Session>[] = [];
      if (classIds) orQuery.push({ class: { $in: stringsToObjectIds(classIds) } });
      if (groupIds) orQuery.push({ group: { $in: stringsToObjectIds(groupIds) } });
      matchQuery.$or = orQuery;
    }

    const pipeline: PipelineStage[] = [
      {
        $match: matchQuery,
      },
      {
        $project: {
          _id: 1,
          startTime: 1,
          class: 1,
          attendanceArray: { $objectToArray: "$attendence" },
        },
      },
      {
        $unwind: "$attendanceArray",
      },
    ];

    if (studentId) {
      pipeline.push({
        $match: {
          "attendanceArray.k": studentId,
        },
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: "students",
          let: { studentId: { $toObjectId: "$attendanceArray.k" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$studentId"] },
              },
            },
          ],
          as: "student",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "class",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      {
        $project: {
          _id: "$attendanceArray.k",
          newId: { $arrayElemAt: ["$student.newId", 0] },
          student: { $arrayElemAt: ["$student", 0] },
          className: { $arrayElemAt: ["$classInfo.name", 0] },
          sessionDate: "$startTime",
          status: "$attendanceArray.v",
        },
      },
    );

    const response = await this.model.aggregate<getLatestAttendanceDto>(pipeline);

    return response;
  }

  async listCanceledSession(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<listCanceledSessionDto[]> {
    const timeQuery: { $gte?: Date; $lte?: Date } = {};
    if (dateInterval) {
      if (dateInterval.from) {
        timeQuery.$gte = dateInterval.from;
      }

      if (dateInterval.to) {
        timeQuery.$lte = dateInterval.to;
      }
    }
    const aggregationPipeline = [
      {
        $match: {
          class: { $in: stringsToObjectIds(classesIds) },
          ...(dateInterval ? { startTime: timeQuery } : {}),
          status: SESSION_STATUS_ENUM.CANCELED,
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacherData",
        },
      },
      {
        $lookup: {
          from: "subjecttypes",
          localField: "subjectType",
          foreignField: "_id",
          as: "subjectTypeData",
        },
      },
      {
        $lookup: {
          from: "subsubjecttypes",
          localField: "subSubjectType",
          foreignField: "_id",
          as: "subSubjectTypeData",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "class",
          foreignField: "_id",
          as: "classData",
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "group",
          foreignField: "_id",
          as: "groupData",
        },
      },
      {
        $addFields: {
          hasSubjectType: { $gt: [{ $size: "$subjectTypeData" }, 0] },
          hasSubSubjectType: { $gt: [{ $size: "$subSubjectTypeData" }, 0] },
          hasGroup: { $gt: [{ $size: "$groupData" }, 0] },
          hasClass: { $gt: [{ $size: "$classData" }, 0] },
          hasTeacher: { $gt: [{ $size: "$teacherData" }, 0] },
        },
      },
      {
        $project: {
          _id: 1,
          newId: "$newId",
          teacher: { $arrayElemAt: ["$teacherData", 0] },
          sessionStartDate: "$startTime",
          reasonForCanceling: "$reasonForCanceling",
          className: {
            $switch: {
              branches: [
                { case: "$hasClass", then: { $arrayElemAt: ["$classData.name", 0] } },
                { case: "$hasGroup", then: { $arrayElemAt: ["$groupData.name", 0] } },
              ],
              default: null,
            },
          },
          topicName: {
            $switch: {
              branches: [
                { case: "$hasSubjectType", then: { $arrayElemAt: ["$subjectTypeData.name", 0] } },
                {
                  case: "$hasSubSubjectType",
                  then: { $arrayElemAt: ["$subSubjectTypeData.name", 0] },
                },
                { case: "$hasGroup", then: { $arrayElemAt: ["$groupData.groupType.name", 0] } },
              ],
              default: null,
            },
          },
        },
      },
    ];

    return this.model.aggregate<listCanceledSessionDto>(aggregationPipeline);
  }

  async getSessionCanceledStats(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<{ tag: string; percentage: number }[]> {
    const timeQuery: { $gte?: Date; $lte?: Date } = {};
    if (dateInterval) {
      if (dateInterval.from) {
        timeQuery.$gte = dateInterval.from;
      }

      if (dateInterval.to) {
        timeQuery.$lte = dateInterval.to;
      }
    }

    const result = await this.model.aggregate<{ chartData: { tag: string; percentage: number }[] }>(
      [
        {
          $match: {
            class: { $in: stringsToObjectIds(classesIds) },
            ...(dateInterval ? { startTime: timeQuery } : {}),
          },
        },
        {
          $addFields: {
            cancellationStatus: {
              $cond: {
                if: { $eq: ["$status", "canceled"] },
                then: "canceledSession",
                else: "notCanceledSession",
              },
            },
          },
        },
        {
          $group: {
            _id: "$cancellationStatus",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            statuses: { $push: { status: "$_id", count: "$count" } },
            total: { $sum: "$count" },
          },
        },
        {
          $project: {
            _id: 0,
            chartData: {
              $map: {
                input: "$statuses",
                as: "item",
                in: {
                  tag: "$$item.status",
                  percentage: {
                    $multiply: [{ $divide: ["$$item.count", "$total"] }, 100],
                  },
                },
              },
            },
          },
        },
        {
          $unwind: "$chartData",
        },
        {
          $group: {
            _id: null,
            chartData: { $push: "$chartData" },
          },
        },
        {
          $project: {
            _id: 0,
            chartData: 1,
          },
        },
      ],
    );

    return result.length > 0 ? result[0].chartData : [];
  }

  async updatePaidTeacherStatus(teacherId: ID, isTeacherPaid: boolean): Promise<void> {
    await this.model.updateMany(
      {
        teacher: teacherId,
      },
      {
        isTeacherPaid,
      },
      {
        session: this.session,
      },
    );
  }

  async getTeacherHourDistribution(
    startTime: Date,
    endTime: Date,
    teacherId: ID,
  ): Promise<
    {
      sessionStatus: TSessionStatusEnum;
      totalMinutes: number;
      totalHours: number;
    }[]
  > {
    const hoursDistribution = this.model.aggregate<{
      sessionStatus: TSessionStatusEnum;
      totalMinutes: number;
      totalHours: number;
    }>([
      {
        $match: {
          teacher: teacherId,
          startTime: { $gte: startTime },
          endTime: { $lte: endTime },
          status: { $ne: "inProgress" },
        },
      },
      {
        $project: {
          minute: { $dateDiff: { startDate: "$startTime", endDate: "$endTime", unit: "minute" } },
          status: 1,
        },
      },
      { $group: { _id: "$status", totalMinutes: { $sum: "$minute" } } },
      { $addFields: { totalHours: { $divide: ["$totalMinutes", 60] } } },
    ]);

    return hoursDistribution;
  }
  async assignTeacherToSessionGroup(groupId: ID, teacherId: ID): Promise<void> {
    await this.model.updateMany(
      { group: groupId, status: SESSION_STATUS_ENUM.WAITING },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async assignTeacherToWaitingSessionOfSubjectType(
    classId: ID,
    subjectTypeId: ID,
    teacherId: ID,
  ): Promise<void> {
    await this.model.updateOne(
      { class: classId, subjectType: subjectTypeId, status: SESSION_STATUS_ENUM.WAITING },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ group: groupId });
  }

  async getStudentAttendanceStats(
    studentId: ID,
    dateInterval: { from: Date; to: Date },
  ): Promise<{ absent: number; late: number; expelled: number }> {
    const pipeline: PipelineStage[] = [];

    pipeline.push({
      $match: {
        [`attendence.${studentId}`]: { $exists: true },
        startTime: { $gte: dateInterval.from },
        endTime: { $lte: dateInterval.to },
      },
    });

    pipeline.push({
      $group: {
        _id: `$attendence.${studentId}`,
        count: { $sum: 1 },
      },
    });

    const result = await this.model.aggregate<{ _id: string; count: number }>(pipeline);

    const absent = result.find(item => item._id === ATTENDANCE_ENUM.ABSENT);
    const late = result.find(item => item._id === ATTENDANCE_ENUM.LATE);
    const expelled = result.find(item => item._id === ATTENDANCE_ENUM.EXPELLED);

    const stats = {
      absent: absent ? absent.count : 0,
      late: late ? late.count : 0,
      expelled: expelled ? expelled.count : 0,
    };

    return stats;
  }
  async updateTeacherPaymentStatus(
    teacherId: ID,
    dates: {
      startTime: Date;
      endTime: Date;
    },
    isTeacherPaid: boolean,
  ): Promise<void> {
    await this.model.updateMany(
      {
        teacher: teacherId,
        startTime: { $gte: dates.startTime },
        endTime: { $lte: dates.endTime },
      },
      {
        isTeacherPaid,
      },
      {
        session: this.session,
      },
    );
  }
}
