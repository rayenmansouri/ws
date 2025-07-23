/* eslint-disable max-params-no-constructor/max-params-no-constructor */
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";

import {
  WeeklySession,
  WeeklySessionMetaData,
} from "../../../feature/weeklySessions/domains/weeklySession.entity";
import {
  enrichedWeeklySessionData,
  WeeklySessionRepo,
} from "../../../feature/weeklySessions/repos/WeeklySession.repo";
import { ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { TTopicTypeEnum } from "../../../helpers/constants";

export class MongoWeeklySessionRepo
  extends MongoBaseRepo<WeeklySessionMetaData>
  implements WeeklySessionRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "weeklySession", session);
  }

  async unAssignTeacherFromWeeklySessionsOfSubSubjectTypeByClass(
    classId: ID,
    subSubjectTypeId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subSubjectType: subSubjectTypeId },
      { teacher: null },
      { session: this.session },
    );
  }

  async unAssignTeacherFromWeeklySessionsOfSubjectTypeByClass(
    classId: ID,
    subjectTypeId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subjectType: subjectTypeId },
      { teacher: null },
      { session: this.session },
    );
  }

  async assignTeacherToWeeklySessionsOfSubSubjectTypeByClass(
    classId: ID,
    teacherId: ID,
    subSubjectTypeId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subSubjectType: subSubjectTypeId },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async assignTeacherToWeeklySessionsOfSubjectTypeByClass(
    classId: ID,
    teacherId: ID,
    subjectTypeId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subjectType: subjectTypeId },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async findManyByTeacherInRange(
    teacherId: ID,
    classId: ID | null,
    groupId: ID | null,
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week?: "A" | "B",
  ): Promise<WeeklySession[]> {
    if (!classId && !groupId) throw new Error("classId or groupId must be provided");
    const publishedWeeklySessionForTeacherQuery: FilterQuery<WeeklySession> = {
      teacher: teacherId,
      isDraft: false,
      week: week ? week : undefined,
      "startTime.day": startTime.day,
    };
    if (classId) publishedWeeklySessionForTeacherQuery.class = { $ne: classId };
    if (groupId) publishedWeeklySessionForTeacherQuery.group = { $ne: groupId };

    const draftWeeklySessionForTeacherQuery: FilterQuery<WeeklySession> = {
      teacher: teacherId,
      isDraft: true,
      week: week ? week : undefined,
      "startTime.day": startTime.day,
    };
    if (classId) draftWeeklySessionForTeacherQuery.class = classId;
    if (groupId) draftWeeklySessionForTeacherQuery.group = groupId;

    const dateRangeFilter: FilterQuery<WeeklySession> = this.generateTimeRangeQuery(
      startTime,
      endTime,
    );

    const weeklySession = await this.model
      .find({
        $and: [
          { $or: [publishedWeeklySessionForTeacherQuery, draftWeeklySessionForTeacherQuery] },
          dateRangeFilter,
        ],
      })
      .lean();
    return weeklySession;
  }

  async findDraftWeeklySessionsByClassInRange(
    classIds: ID[],
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week: "A" | "B" | undefined,
    classGroupId: ID | undefined,
  ): Promise<WeeklySession[]> {
    const publishedWeeklySessionForClassQuery: FilterQuery<WeeklySession> = {
      class: { $in: classIds },
      isDraft: false,
      week,
      classGroup: classGroupId,
      "startTime.day": startTime.day,
    };

    const dateRangeFilter: FilterQuery<WeeklySession> = this.generateTimeRangeQuery(
      startTime,
      endTime,
    );
    const weeklySession = await this.model
      .find({
        $and: [publishedWeeklySessionForClassQuery, dateRangeFilter],
      })
      .lean();

    return weeklySession;
  }

  async findManyByGroupInRange(
    groupIds: ID[],
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week: "A" | "B" | undefined,
  ): Promise<WeeklySession[]> {
    const publishedWeeklySessionForGroupQuery: FilterQuery<WeeklySession> = {
      group: { $in: groupIds },
      isDraft: false,
      week,
      "startTime.day": startTime.day,
    };

    const dateRangeFilter: FilterQuery<WeeklySession> = this.generateTimeRangeQuery(
      startTime,
      endTime,
    );

    return await this.model
      .find({
        $and: [publishedWeeklySessionForGroupQuery, dateRangeFilter],
      })
      .lean();
  }

  async findManyByClassroomInRange(
    classroomId: ID,
    classId: ID | null,
    groupId: ID | null,
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week?: "A" | "B",
  ): Promise<WeeklySession[]> {
    // temporary solution until we have a better way to handle this
    if (!classId && !groupId) throw new Error("classId or groupId must be provided");
    const publishedWeeklySessionForClassroomQuery: FilterQuery<WeeklySession> = {
      classroom: classroomId,
      isDraft: false,
      week,
      "startTime.day": startTime.day,
    };

    if (classId) publishedWeeklySessionForClassroomQuery.class = { $ne: classId };
    if (groupId) publishedWeeklySessionForClassroomQuery.group = { $ne: groupId };

    const draftWeeklySessionForClassroomQuery: FilterQuery<WeeklySession> = {
      classroom: classroomId,
      isDraft: true,
      week,
      "startTime.day": startTime.day,
    };
    if (classId) draftWeeklySessionForClassroomQuery.class = classId;
    if (groupId) draftWeeklySessionForClassroomQuery.group = groupId;

    const dateRangeFilter: FilterQuery<WeeklySession> = this.generateTimeRangeQuery(
      startTime,
      endTime,
    );

    const weeklySession = await this.model
      .find({
        $and: [
          { $or: [publishedWeeklySessionForClassroomQuery, draftWeeklySessionForClassroomQuery] },
          dateRangeFilter,
        ],
      })
      .lean();
    return weeklySession;
  }

  async deletePublishedWeeklySessionsByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId, isDraft: false }).session(this.session);
  }

  async deleteAllDraftWeeklySessions(): Promise<void> {
    await this.model.deleteMany({ isDraft: true }).session(this.session);
  }

  async deletePublishedWeeklySessionsByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ group: groupId, isDraft: false }).session(this.session);
  }

  async findDraftWeeklySessionsByClass(classId: ID): Promise<WeeklySession[]> {
    return await this.model.find({ class: classId, isDraft: true }).session(this.session).lean();
  }

  findDraftWeeklySessionsByGroup(groupId: ID): Promise<WeeklySession[]> {
    return this.model.find({ group: groupId, isDraft: true }).session(this.session).lean();
  }

  async findPublishedWeeklySessionsByClass(classId: ID): Promise<WeeklySession[]> {
    return await this.model.find({ class: classId, isDraft: false }).session(this.session).lean();
  }

  async findTeacherSchedule(
    teacher: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const { isDraft } = scheduleFilterOptions;
    return this.model
      .find({ teacher, isDraft })
      .populate("class classroom classGroup subjectType subSubjectType group sessionType teacher")
      .lean();
  }

  async findStudentSchedule(
    classId: ID,
    groupIds: ID[],
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const { isDraft } = scheduleFilterOptions;
    const filter: FilterQuery<WeeklySession> = {
      class: classId,
      isDraft,
    };

    if (groupIds.length > 0) filter.group = { $in: groupIds };

    return this.model
      .find(filter)
      .populate("class classroom classGroup subjectType subSubjectType group sessionType teacher")
      .lean();
  }

  async findClassroomSchedule(
    classroomId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const { isDraft } = scheduleFilterOptions;
    return this.model
      .find({ classroom: classroomId, isDraft })
      .populate("class classroom classGroup subjectType subSubjectType group sessionType teacher")
      .lean();
  }

  async findClassSchedule(
    classId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const { isDraft } = scheduleFilterOptions;
    return this.model
      .find({ class: classId, isDraft })
      .populate("class classroom classGroup subjectType subSubjectType group sessionType teacher")
      .lean();
  }

  async findGroupSchedule(
    groupId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]> {
    const { isDraft } = scheduleFilterOptions;
    return this.model
      .find({ group: groupId, isDraft })
      .populate("class classroom classGroup subjectType subSubjectType group sessionType teacher")
      .lean();
  }

  async findOneByClassroom(classroomId: ID): Promise<WeeklySession | null> {
    return this.model.findOne({ classroom: classroomId }).lean();
  }

  async deleteManyByClassesAndTopic(
    classId: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<void> {
    await this.model.deleteMany({ class: { $in: classId }, [topicType]: topicId });
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }

  private generateTimeRangeQuery(
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
  ): FilterQuery<WeeklySession> {
    return {
      $or: [
        { "startTime.timeStamps": { $gte: startTime.timeStamps, $lt: endTime.timeStamps } },
        { "endTime.timeStamps": { $gt: startTime.timeStamps, $lte: endTime.timeStamps } },
        {
          "startTime.timeStamps": { $lt: startTime.timeStamps },
          "endTime.timeStamps": { $gt: endTime.timeStamps },
        },
      ],
    };
  }

  async assignTeacherToWeeklySessionGroup(groupId: ID, teacherId: ID): Promise<void> {
    await this.model.updateMany(
      { group: groupId },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async assignTeacherToWaitingSession(
    classId: ID,
    subjectTypeId: ID,
    teacherId: ID,
  ): Promise<void> {
    await this.model.updateMany(
      { class: classId, subjectType: subjectTypeId },
      { teacher: teacherId },
      { session: this.session },
    );
  }

  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ group: groupId });
  }
}
