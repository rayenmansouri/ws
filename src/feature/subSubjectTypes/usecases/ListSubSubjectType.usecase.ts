import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubSubjectTypesRepo } from "../repos/SubSubjectTypes.repo";
import { ListOptions } from "../../../types/types";
import { SubSubjectTypeMapper } from "../mappers/subSubjectType.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { SubSubjectTypeDto } from "../dtos/subSubjectType.dto";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";

@injectable()
export class ListSubSubjectTypeUseCase {
  constructor(@inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo) {}

  async execute(
    search: string | undefined,
    listOption: ListOptions,
  ): Promise<ResponseWithPagination<SubSubjectTypeDto>> {
    const subSubjectTypes = await this.subSubjectTypeRepo.list(search, listOption);

    return applyMapperToPaginatedResponse(
      subSubjectTypes,
      SubSubjectTypeMapper.toSubSubjectTypeDTO,
    );
  }
}
