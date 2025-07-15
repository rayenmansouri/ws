import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { WeeklySessionRepo } from "../repos/WeeklySession.repo";

@injectable()
export class DeleteWeeklySessionUseCase {
  constructor(@inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo) {}

  async execute(weeklySessionNewId: string): Promise<void> {
    const weeklySession = await this.weeklySessionRepo.findOneByNewIdOrThrow(
      weeklySessionNewId,
      "notFound.session",
    );

    await this.weeklySessionRepo.deleteOneById(weeklySession._id);
  }
}
