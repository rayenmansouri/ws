import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BarCodeConfigRepo } from "../domain/BarCodeConfig.repo";

@injectable()
export class UpdateBarCodeConfigUseCase {
  constructor(@inject("BarCodeRepo") private barCodeConfigRepo: BarCodeConfigRepo) {}

  async execute(
    barCodeNewId: string,
    data: Partial<{
      name: string;
      numRows: number;
      numCodes: number;
      top: number;
      left: number;
      width: number;
      height: number;
    }>,
  ): Promise<void> {
    const barCode = await this.barCodeConfigRepo.findOneByNewIdOrThrow(
      barCodeNewId,
      "notFound.barCode",
    );
    if (data.name && barCode.name != data.name) {
      await this.barCodeConfigRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    }

    await this.barCodeConfigRepo.updateOneById(barCode._id, data);
  }
}
