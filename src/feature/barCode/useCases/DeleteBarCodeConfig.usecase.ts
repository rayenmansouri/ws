import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BarCodeConfigRepo } from "../domain/BarCodeConfig.repo";

@injectable()
export class DeleteBarCodeConfigUseCase {
  constructor(@inject("BarCodeRepo") private barCodeConfigRepo: BarCodeConfigRepo) {}

  async execute(barCodeNewId: string): Promise<void> {
    await this.barCodeConfigRepo.deleteOneByNewId(barCodeNewId);
  }
}
