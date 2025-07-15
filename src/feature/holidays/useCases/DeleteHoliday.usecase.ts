import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { HolidayRepo } from "../domain/Holiday.repo";

@injectable()
export class DeleteHolidayUseCase {
  constructor(@inject("HolidayRepo") private holidayRepo: HolidayRepo) {}

  async execute(holidayNewId: string): Promise<void> {
    const holiday = await this.holidayRepo.findOneByNewIdOrThrow(holidayNewId, "notFound.holiday");

    await this.holidayRepo.deleteOneById(holiday._id);
  }
}
