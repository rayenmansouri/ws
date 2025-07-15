import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { GroupMapper } from "../mappers/Group.mapper";
import { GroupDto } from "../dtos/Group.dto";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { NotFoundError } from "../../../core/ApplicationErrors";

@injectable()
export class CheckGroupUseCase {
  constructor(@inject("GroupRepo") private groupRepo: GroupRepo) {}

  async execute(groupNewId: string, user: { type: TEndUserEnum; _id: ID }): Promise<GroupDto> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    if (user.type === END_USER_ENUM.TEACHER && group.teacher != user._id) {
      throw new NotFoundError("notFound.group");
    }

    return GroupMapper.toGroupDto(group);
  }
}
