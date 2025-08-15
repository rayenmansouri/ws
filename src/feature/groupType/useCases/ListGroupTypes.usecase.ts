import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { GroupTypeDto } from "../dtos/groupType.dto";
import { GroupTypeMapper } from "../mappers/groupType.mapper";

type ListGroupTypesParams = {
  search?: string;
  limit?: number;
  page?: number;
};
@injectable()
export class ListGroupTypesUseCase {
  constructor(@inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo) {}

  async execute(params: ListGroupTypesParams): Promise<ResponseWithPagination<GroupTypeDto>> {
    const { search, limit, page } = params;
    const groupTypes = await this.groupTypeRepo.list({ search }, { limit, page });
    const data = applyMapperToPaginatedResponse(groupTypes, GroupTypeMapper.toGroupTypeDto);
    return data;
  }
}
