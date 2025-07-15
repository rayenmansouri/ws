import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { SmartCalendarSessionRepo } from "../domain/SmartCalendarSession.repo";
import { SMART_CALENDAR_SCHEDULE_STATUS_ENUM } from "../domain/smartCalendarSchedule.entity";

@injectable()
export class DeleteSmartCalendarScheduleUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("SmartCalendarSessionRepo") private smartCalendarSessionRepo: SmartCalendarSessionRepo,
  ) {}

  async execute(smartCalendarScheduleNewId: string): Promise<void> {
    const smartCalendarSchedule = await this.smartCalendarScheduleRepo.findOneByNewIdOrThrow(
      smartCalendarScheduleNewId,
      "notFound.schedule",
    );

    if (smartCalendarSchedule.status === SMART_CALENDAR_SCHEDULE_STATUS_ENUM.IN_PROGRESS)
      throw new BadRequestError("smartCalendar.scheduleInProgressCannotBeDeleted");

    await this.smartCalendarSessionRepo.deleteManyBySmartCalendarSchedule(
      smartCalendarSchedule._id,
    );

    await this.smartCalendarScheduleRepo.deleteOneById(smartCalendarSchedule._id);
  }
}
