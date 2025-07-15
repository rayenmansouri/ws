import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BarCodeConfigRepo } from "../domain/BarCodeConfig.repo";
import { BarCodeConfigMapper } from "../mappers/BarCodeConfig.mapper";
import { BarCodeConfigDto } from "../dtos/barCodeConfig.dto";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

@injectable()
export class ListBarCodeConfigUseCase {
  constructor(@inject("BarCodeRepo") private barCodeConfigRepo: BarCodeConfigRepo) {}

  async execute(
    filter: { name?: string } & ListOptions,
  ): Promise<ResponseWithPagination<BarCodeConfigDto>> {
    const barCodes = await this.barCodeConfigRepo.list(filter);

    const docs = barCodes.docs.map(doc => BarCodeConfigMapper.toBarCodeConfigDto(doc));
    return { docs, meta: barCodes.meta };
  }
}
