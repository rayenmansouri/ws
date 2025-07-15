import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class WeeklySessionApplicationService {
  constructor(@inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo) {}

  async isClassroomAvailable(
    data: {
      classroomId: ID;
      startTime: { day: number; hours: number; minutes: number };
      endTime: { day: number; hours: number; minutes: number };
      week?: "A" | "B";
      excludeWeeklySessionId?: ID;
    } & ({ classId: ID; groupId?: undefined } | { classId?: undefined; groupId: ID }),
  ): Promise<boolean> {
    const { classroomId, classId, startTime, endTime, week, groupId, excludeWeeklySessionId } =
      data;
    const startTimeStamps = startTime.hours * 60 + startTime.minutes;
    const endTimeStamps = endTime.hours * 60 + endTime.minutes;
    const weeklySessionWithSameClassroomInRange =
      await this.weeklySessionRepo.findManyByClassroomInRange(
        classroomId,
        classId || null,
        groupId || null,
        { day: startTime.day, timeStamps: startTimeStamps },
        { day: endTime.day, timeStamps: endTimeStamps },
        week,
      );

    return (
      weeklySessionWithSameClassroomInRange.filter(
        weeklySession => weeklySession._id != excludeWeeklySessionId,
      ).length === 0
    );
  }

  async isTeacherAvailable(
    data: {
      teacherId: ID;
      startTime: { day: number; hours: number; minutes: number };
      endTime: { day: number; hours: number; minutes: number };
      week?: "A" | "B";
      excludeWeeklySessionId?: ID;
    } & ({ classId: ID; groupId?: undefined } | { classId?: undefined; groupId: ID }),
  ): Promise<boolean> {
    const { teacherId, classId, startTime, endTime, week, groupId, excludeWeeklySessionId } = data;
    const startTimeStamps = startTime.hours * 60 + startTime.minutes;
    const endTimeStamps = endTime.hours * 60 + endTime.minutes;

    const weeklySessionWithSameTeacherInRange =
      await this.weeklySessionRepo.findManyByTeacherInRange(
        teacherId,
        classId || null,
        groupId || null,
        { day: startTime.day, timeStamps: startTimeStamps },
        { day: endTime.day, timeStamps: endTimeStamps },
        week,
      );
    return (
      weeklySessionWithSameTeacherInRange.filter(
        weeklySession => weeklySession._id !== excludeWeeklySessionId,
      ).length === 0
    );
  }

  async isClassAvailable(data: {
    classIds: ID[];
    startTime: { day: number; hours: number; minutes: number };
    endTime: { day: number; hours: number; minutes: number };
    week: "A" | "B" | undefined;
    classGroupId: ID | undefined;
  }): Promise<boolean> {
    const { classIds, startTime, endTime, week, classGroupId } = data;
    const startTimeStamps = startTime.hours * 60 + startTime.minutes;
    const endTimeStamps = endTime.hours * 60 + endTime.minutes;

    const weeklySessionWithSameClassInRange =
      await this.weeklySessionRepo.findDraftWeeklySessionsByClassInRange(
        classIds,
        { day: startTime.day, timeStamps: startTimeStamps },
        { day: endTime.day, timeStamps: endTimeStamps },
        week,
        classGroupId,
      );
    return weeklySessionWithSameClassInRange.length === 0;
  }

  async isGroupAvailable(data: {
    groupIds: ID[];
    startTime: { day: number; hours: number; minutes: number };
    endTime: { day: number; hours: number; minutes: number };
    week?: "A" | "B";
  }): Promise<boolean> {
    const { groupIds, startTime, endTime, week } = data;
    const startTimeStamps = startTime.hours * 60 + startTime.minutes;
    const endTimeStamps = endTime.hours * 60 + endTime.minutes;

    const weeklySessionWithSameGroupInRange = await this.weeklySessionRepo.findManyByGroupInRange(
      groupIds,
      { day: startTime.day, timeStamps: startTimeStamps },
      { day: endTime.day, timeStamps: endTimeStamps },
      week,
    );

    return weeklySessionWithSameGroupInRange.length === 0;
  }
}
