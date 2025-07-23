import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { TTopicTypeEnum } from "../../../helpers/constants";
import { WeeklySession, WeeklySessionMetaData } from "../domains/weeklySession.entity";

export type enrichedWeeklySessionData = Populate<
  WeeklySessionMetaData,
  | "class"
  | "classroom"
  | "classGroup"
  | "subjectType"
  | "subSubjectType"
  | "group"
  | "sessionType"
  | "teacher"
>;

export abstract class WeeklySessionRepo extends BaseRepo<WeeklySessionMetaData> {
  abstract deleteManyByClass(classId: ID): Promise<void>;

  abstract deleteManyByGroup(classId: ID): Promise<void>;

  abstract deleteAllDraftWeeklySessions(): Promise<void>;

  abstract deleteManyByClassesAndTopic(
    classId: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<void>;

  abstract findOneByClassroom(classroomId: ID): Promise<WeeklySession | null>;

  abstract findTeacherSchedule(
    teacher: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]>;

  abstract findStudentSchedule(
    classId: ID,
    groupIds: ID[],
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]>;

  abstract findClassroomSchedule(
    classroomId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]>;

  abstract findClassSchedule(
    classId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]>;

  abstract findGroupSchedule(
    groupId: ID,
    scheduleFilterOptions: { isDraft: boolean },
  ): Promise<enrichedWeeklySessionData[]>;

  abstract deletePublishedWeeklySessionsByClass(classId: ID): Promise<void>;

  abstract deletePublishedWeeklySessionsByGroup(groupId: ID): Promise<void>;

  abstract findDraftWeeklySessionsByClass(classId: ID): Promise<WeeklySession[]>;

  abstract findDraftWeeklySessionsByGroup(groupId: ID): Promise<WeeklySession[]>;

  abstract findPublishedWeeklySessionsByClass(classId: ID): Promise<WeeklySession[]>;

  abstract findManyByClassroomInRange(
    classroomId: ID,
    classId: ID | null,
    groupId: ID | null,
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week?: "A" | "B",
  ): Promise<WeeklySession[]>;

  abstract findManyByTeacherInRange(
    teacherId: ID,
    classId: ID | null,
    groupId: ID | null,
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week?: "A" | "B",
  ): Promise<WeeklySession[]>;

  abstract findDraftWeeklySessionsByClassInRange(
    classIds: ID[],
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week: "A" | "B" | undefined,
    classGroupId: ID | undefined,
  ): Promise<WeeklySession[]>;

  abstract findManyByGroupInRange(
    groupIds: ID[],
    startTime: { day: number; timeStamps: number },
    endTime: { day: number; timeStamps: number },
    week?: "A" | "B",
  ): Promise<WeeklySession[]>;

  abstract assignTeacherToWeeklySessionGroup(groupId: ID, teacherId: ID): Promise<void>;
  abstract assignTeacherToWeeklySessionsOfSubjectTypeByClass(
    classId: ID,
    teacherId: ID,
    subjectTypeId: ID,
  ): Promise<void>;

  abstract unAssignTeacherFromWeeklySessionsOfSubjectTypeByClass(
    classId: ID,
    subjectTypeId: ID,
  ): Promise<void>;

  abstract assignTeacherToWeeklySessionsOfSubSubjectTypeByClass(
    classId: ID,
    teacherId: ID,
    subSubjectTypeId: ID,
  ): Promise<void>;

  abstract unAssignTeacherFromWeeklySessionsOfSubSubjectTypeByClass(
    classId: ID,
    subSubjectTypeId: ID,
  ): Promise<void>;
}
