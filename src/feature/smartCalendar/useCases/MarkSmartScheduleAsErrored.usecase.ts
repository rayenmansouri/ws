import { injectable } from "inversify/lib/inversify";
import { ID } from "../../../types/BaseEntity";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { SMART_CALENDAR_SCHEDULE_STATUS_ENUM } from "../domain/smartCalendarSchedule.entity";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class MarkSmartScheduleAsErroredUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
  ) {}

  async execute(scheduleId: ID): Promise<void> {
    const schedule = await this.smartCalendarScheduleRepo.findOneByIdOrThrow(
      scheduleId,
      "notFound.schedule",
    );

    await this.smartCalendarScheduleRepo.updateOneById(schedule._id, {
      status: SMART_CALENDAR_SCHEDULE_STATUS_ENUM.ERROR,
    });

    return;
  }
}
