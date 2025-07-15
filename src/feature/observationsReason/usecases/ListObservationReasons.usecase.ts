import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ObservationReasonRepo } from "../domains/ObservationReason.repo";
import { ObservationReasonDTO } from "../dtos/observationReason.dto";
import { ObservationReasonMapper } from "../mappers/observationReason.mapper";

type ListObservationReasonsData = {
  search?: string;
  page?: number;
  limit?: number;
};

@injectable()
export class ListObservationReasonsUseCase {
  constructor(
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
  ) {}

  async execute(
    data: ListObservationReasonsData,
  ): Promise<ResponseWithPagination<ObservationReasonDTO>> {
    const { search, page, limit } = data;
    const observationReasons = await this.observationReasonRepo.listObservationReasons(
      { search },
      { page, limit },
    );

    const observationReasonsDTO = applyMapperToPaginatedResponse(
      observationReasons,
      ObservationReasonMapper.toDTO,
    );

    return observationReasonsDTO;
  }
}
