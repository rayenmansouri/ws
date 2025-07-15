import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MasterRepo } from "../domain/Master.repo";

@injectable()
export class DeleteMasterUseCase {
  constructor(@inject("MasterRepo") private masterRepo: MasterRepo) {}

  async execute(masterNewId: string): Promise<void> {
    await this.masterRepo.findOneByNewIdOrThrow(masterNewId, "notFound.master");

    await this.masterRepo.deleteOneByNewId(masterNewId);
  }
}
