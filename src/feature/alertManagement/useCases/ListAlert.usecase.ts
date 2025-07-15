import { AlertMapper } from "./../mappers/alert.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { AlertRepo } from "../domain/Alert.repo";
import { AlertDto } from "../dto/alert.dto";

export type listAlertsRequestDto = {
  pagination: ListOptions;
  search?: string;
};

@injectable()
export class ListAlertUseCase {
  constructor(@inject("AlertRepo") private readonly alertRepo: AlertRepo) {}

  async execute(options: listAlertsRequestDto): Promise<ResponseWithPagination<AlertDto>> {
    const alerts = await this.alertRepo.listAlerts({ search: options.search }, options.pagination);

    return {
      docs: alerts.docs.map(alert => AlertMapper.toAlertDto(alert)),
      meta: alerts.meta,
    };
  }
}
