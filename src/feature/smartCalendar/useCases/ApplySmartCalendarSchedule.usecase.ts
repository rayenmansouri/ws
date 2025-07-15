import { injectable } from "inversify/lib/inversify";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarSessionRepo } from "../domain/SmartCalendarSession.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { WeeklySession } from "../../weeklySessions/domains/weeklySession.entity";
import { BaseEntity } from "../../../types/BaseEntity";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ApplyWeeklyScheduleForClassUseCase } from "../../schedules/useCases/ApplyWeeklyScheduleForClass.usecase";

@injectable()
export class ApplySmartCalendarScheduleUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("SmartCalendarSessionRepo")
    private smartCalendarSessionRepo: SmartCalendarSessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ApplyWeeklyScheduleForClassUseCase")
    private applyWeeklyScheduleForClassUseCase: ApplyWeeklyScheduleForClassUseCase,
  ) {}

  async execute(smartCalendarScheduleNewId: string): Promise<void> {
    const smartCalendarSchedule = await this.smartCalendarScheduleRepo.findOneByNewIdOrThrow(
      smartCalendarScheduleNewId,
      "notFound.schedule",
    );

    const sessions = await this.smartCalendarSessionRepo.findManyBySmartCalendarSchedule(
      smartCalendarSchedule._id,
    );

    await this.weeklySessionRepo.deleteAllDraftWeeklySessions();

    const draftWeeklySessionsPayloads: Omit<WeeklySession, keyof BaseEntity>[] = sessions.map(
      session => ({
        class: session.class,
        teacher: session.teacher,
        classroom: session.classroom,
        sessionType: session.sessionType,
        subjectType: session.subjectType,
        subSubjectType: session.subSubjectType,
        classGroup: session.classGroup,
        group: session.group,
        startTime: session.startTime,
        endTime: session.endTime,
        week: session.week,
        isDraft: true,
      }),
    );
    await this.weeklySessionRepo.addMany(draftWeeklySessionsPayloads);

    const allLevels = await this.levelRepo.findAll();
    const currentSchoolYearIds = allLevels.map(level => level.currentSchoolYear._id);
    const allClasses = await this.classRepo.findBySchoolYearIds(currentSchoolYearIds);

    for (const classDoc of allClasses)
      await this.applyWeeklyScheduleForClassUseCase.execute(classDoc.newId);
  }
}
