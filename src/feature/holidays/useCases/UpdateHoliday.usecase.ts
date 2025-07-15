import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { HolidayRepo } from "../domain/Holiday.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { Holiday } from "../domain/holiday.entity";
import moment from "moment";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";

@injectable()
export class UpdateHolidayUseCase {
  constructor(
    @inject("HolidayRepo") private holidayRepo: HolidayRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(
    holidayNewId: string,
    data: Partial<{ name: string; isDeletionOfSessionDisabled: boolean }> & {
      startDate: Date;
      endDate: Date;
    },
  ): Promise<void> {
    const holiday = await this.holidayRepo.findOneByNewIdOrThrow(holidayNewId, "notFound.holiday");

    if (data.name && holiday.name !== data.name)
      await this.holidayRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.validateHolidayRange(holiday, data.startDate, data.endDate);

    if (data.isDeletionOfSessionDisabled === true) {
      await this.sessionRepo.deleteWaitingSessionByRange(data.startDate, data.endDate);
    }

    await this.holidayRepo.updateOneById(holiday._id, {
      start: data.startDate,
      end: data.endDate,
      name: data.name,
    });
  }

  private async validateHolidayRange(
    holiday: Holiday,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const holidayWithSameRange = await this.holidayRepo.findOneByRange(startDate, endDate);

    if (holidayWithSameRange && holiday._id !== holidayWithSameRange._id) {
      throw new BadRequestError("alreadyUsed.range");
    }
  }
}
