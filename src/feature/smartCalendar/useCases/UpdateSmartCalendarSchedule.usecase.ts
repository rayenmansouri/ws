import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";

type UpdateSmartCalendarScheduleRequest = {
  newId: string;
  name?: string;
};

@injectable()
export class UpdateSmartCalendarScheduleUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
  ) {}

  async execute(dto: UpdateSmartCalendarScheduleRequest): Promise<void> {
    const schedule = await this.smartCalendarScheduleRepo.findOneByNewIdOrThrow(
      dto.newId,
      "notFound.schedule",
    );

    if (dto.name && dto.name !== schedule.name)
      await this.smartCalendarScheduleRepo.ensureFieldUniqueness(
        "name",
        dto.name,
        "alreadyUsed.name",
      );

    await this.smartCalendarScheduleRepo.updateOneById(schedule._id, {
      name: dto.name,
    });
  }
}
