import { injectable } from "inversify";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { GroupApplicationService } from "../applicationServices/Group.application.service";
import { inject } from "../../../core/container/TypedContainer";
import { GroupMapper } from "../mappers/Group.mapper";
import { paginateResult } from "../../../helpers/paginateResult";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { GroupDto } from "../dtos/Group.dto";

@injectable()
export class ListTeacherGroupUseCase {
  constructor(
    @inject("GroupApplicationService")
    private groupApplicationService: GroupApplicationService,
  ) {}

  async execute(
    teacher: Teacher,
    listOption: ListOptions,
  ): Promise<ResponseWithPagination<GroupDto>> {
    const groupDocs = await this.groupApplicationService.getTeacherGroups(teacher);

    const groupDto = groupDocs.map(group => GroupMapper.toGroupDto(group));
    const groupPaginated = paginateResult(groupDto, listOption.limit, listOption.page);

    return groupPaginated;
  }
}
