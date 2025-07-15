import { injectable } from "inversify/lib/inversify";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { SmartCalendarActivity } from "../../../apps/smart-calendar/usecases/SendSolution.usecase";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarSessionRepo } from "../domain/SmartCalendarSession.repo";
import { SmartCalendarSession } from "../domain/smartCalendarSession.entity";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { InternalError } from "../../../core/ApplicationErrors";
import { SMART_CALENDAR_SCHEDULE_STATUS_ENUM } from "../domain/smartCalendarSchedule.entity";

@injectable()
export class CompleteScheduleGenerationUseCase {
  constructor(
    @inject("SmartCalendarSessionRepo")
    private smartCalendarSessionRepo: SmartCalendarSessionRepo,
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(scheduleId: ID, activities: SmartCalendarActivity[]): Promise<void> {
    const schedule = await this.smartCalendarScheduleRepo.findOneByIdOrThrow(
      scheduleId,
      "notFound.schedule",
    );

    if (schedule.status !== SMART_CALENDAR_SCHEDULE_STATUS_ENUM.IN_PROGRESS)
      throw new InternalError();

    const allLevels = await this.levelRepo.findAll();
    const currentSchoolYearIds = allLevels.map(level => level.currentSchoolYear._id);

    const allClasses = await this.classRepo.findBySchoolYearIds(currentSchoolYearIds);

    const smartCalendarSessionsPayload: Omit<SmartCalendarSession, keyof BaseEntity>[] = [];

    for (const activity of activities) {
      const classDoc = allClasses.find(classDoc => classDoc._id === activity.class);
      if (!classDoc) throw new InternalError("notFound.class");

      const classGroupId = activity.classGroup ? classDoc.classGroups[+activity.classGroup] : null;

      smartCalendarSessionsPayload.push({
        smartCalendarSchedule: scheduleId,
        class: activity.class as ID,
        group: null,
        sessionType: activity.sessionType as ID,
        subjectType: activity.subjectType as ID,
        subSubjectType: activity.subSubjectType as ID,
        teacher: activity.teacher as ID,
        week: activity.week,
        classGroup: classGroupId,
        startTime: activity.startTime,
        endTime: activity.endTime,
        classroom: activity.classroom as ID,
      });
    }

    await this.smartCalendarSessionRepo.addMany(smartCalendarSessionsPayload);

    await this.smartCalendarScheduleRepo.updateOneById(scheduleId, {
      status: SMART_CALENDAR_SCHEDULE_STATUS_ENUM.COMPLETED,
    });
  }
}
