import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MasterRepo } from "../domain/Master.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { MasterDTO } from "../dtos/master.dto";
import { MasterMapper } from "../mappers/Master.mapper";

@injectable()
export class ListMastersUseCase {
  constructor(@inject("MasterRepo") private masterRepo: MasterRepo) {}

  async execute(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<MasterDTO>> {
    const data = await this.masterRepo.listMaster(filter, options);

    const mastersDTO = data.docs.map(master => MasterMapper.toMasterDTO(master));

    return {
      docs: mastersDTO,
      meta: data.meta,
    };
  }
}
