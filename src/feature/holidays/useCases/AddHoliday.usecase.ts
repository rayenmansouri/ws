import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { HolidayRepo } from "../domain/Holiday.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ID } from "../../../types/BaseEntity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import moment from "moment";

@injectable()
export class AddHolidayUseCase {
  constructor(
    @inject("HolidayRepo") private holidayRepo: HolidayRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(data: {
    name: string;
    startDate: Date;
    endDate: Date;
    levelNewIds: string[];
    isDeletionOfSessionDisabled: boolean;
  }): Promise<void> {
    await this.holidayRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const levelIds = await this.validateLevels(data.levelNewIds);

    await this.validateHolidayRange(data.startDate, data.endDate);

    if (data.isDeletionOfSessionDisabled) {
      await this.sessionRepo.deleteWaitingSessionByRange(data.startDate, data.endDate);
    }

    await this.holidayRepo.addOne({
      name: data.name,
      start: data.startDate,
      end: data.endDate,
      levels: levelIds,
    });
  }

  private async validateHolidayRange(startDate: Date, endDate: Date): Promise<void> {
    const holiday = await this.holidayRepo.findOneByRange(startDate, endDate);

    if (holiday) throw new BadRequestError("alreadyUsed.range");
  }

  private async validateLevels(levelNewIds: string[]): Promise<ID[]> {
    const levels = await this.levelRepo.findManyByNewIdsOrThrow(levelNewIds, "notFound.level");

    return levels.map(level => level._id);
  }
}
