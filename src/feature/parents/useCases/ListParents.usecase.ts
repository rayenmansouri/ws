import { injectable } from "inversify";
import { ParentRepo } from "../domain/Parent.repo";
import { ListOptions } from "../../../types/types";
import { ParentMapper } from "../mappers/Parent.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ParentDTO } from "../dtos/Parent.dto";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class ListParentsUseCase {
  constructor(@inject("ParentRepo") private parentRepo: ParentRepo) {}

  async execute(
    filter: { search?: string; isArchived?: boolean; isActive?: boolean },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ParentDTO>> {
    const data = await this.parentRepo.listParentWithStudents(filter, options);

    const response = applyMapperToPaginatedResponse(data, ParentMapper.toDTO);

    return response;
  }
}
