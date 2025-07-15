import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AlertRepo } from "../domain/Alert.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteAlertUseCase {
  constructor(@inject("AlertRepo") private readonly alertRepo: AlertRepo) {}

  async execute(alertNewId: string): Promise<void> {
    const alert = await this.alertRepo.findOneByNewIdOrThrow(alertNewId, "notFound.alert");

    if (alert.status === "sent") throw new BadRequestError("alert.cannotUpdateSentAlert");

    await this.alertRepo.deleteOneById(alert._id);
  }
}
