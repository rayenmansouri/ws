import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AlertRepo } from "../domain/Alert.repo";
import { AlertDetails } from "./../dto/alert.dto";
import { AlertMapper } from "./../mappers/alert.mapper";

@injectable()
export class GetAlertDetailsUseCase {
  constructor(@inject("AlertRepo") private readonly alertRepo: AlertRepo) {}

  async execute(alertNewId: string): Promise<AlertDetails> {
    const alert = await this.alertRepo.findOneByNewIdOrThrow(alertNewId, "notFound.alert", {
      populate: ["users.userId", "createdBy"],
    });
    const mappedAlert = AlertMapper.toAlertDetails(alert);
    return mappedAlert;
  }
}
