import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BarCodeConfigRepo } from "../domain/BarCodeConfig.repo";
import { BarCodeConfigMapper } from "../mappers/BarCodeConfig.mapper";
import { BarCodeConfigDto } from "../dtos/barCodeConfig.dto";

@injectable()
export class AddBarCodeConfigUseCase {
  constructor(@inject("BarCodeRepo") private barCodeConfigRepo: BarCodeConfigRepo) {}

  async execute(data: {
    name: string;
    numRows: number;
    numCodes: number;
    top: number;
    left: number;
    width: number;
    height: number;
  }): Promise<BarCodeConfigDto> {
    await this.barCodeConfigRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const barCode = await this.barCodeConfigRepo.addOne(data);

    return BarCodeConfigMapper.toBarCodeConfigDto(barCode);
  }
}
