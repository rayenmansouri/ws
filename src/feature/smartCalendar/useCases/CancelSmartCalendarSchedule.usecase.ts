import { injectable } from "inversify/lib/inversify";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { inject } from "../../../core/container/TypedContainer";
import { SMART_CALENDAR_SCHEDULE_STATUS_ENUM } from "../domain/smartCalendarSchedule.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ScheduleGenerator } from "../domain/ScheduleGenerator.interface";

@injectable()
export class CancelSmartCalendarScheduleUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("ScheduleGenerator")
    private scheduleGenerator: ScheduleGenerator,
  ) {}

  async execute(smartCalendarScheduleNewId: string): Promise<void> {
    const smartCalendarSchedule = await this.smartCalendarScheduleRepo.findOneByNewIdOrThrow(
      smartCalendarScheduleNewId,
      "notFound.schedule",
    );

    await this.scheduleGenerator.stopGeneration(smartCalendarSchedule._id);

    if (smartCalendarSchedule.status !== SMART_CALENDAR_SCHEDULE_STATUS_ENUM.IN_PROGRESS)
      throw new BadRequestError("smartCalendar.onlyInProgressScheduleCanBeCanceled");

    await this.smartCalendarScheduleRepo.updateOneById(smartCalendarSchedule._id, {
      status: SMART_CALENDAR_SCHEDULE_STATUS_ENUM.CANCELLED,
    });
  }
}
