import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { GroupOverviewDTO } from "../dtos/GroupOverview.dto";
import { GroupMapper } from "../mappers/Group.mapper";
import { GroupRepo } from "../repos/Group.repo";

@injectable()
export class GetGroupOverviewUseCase {
  constructor(@inject("GroupRepo") private groupRepo: GroupRepo) {}

  async execute({
    groupNewId,
    userId,
    userType,
  }: {
    groupNewId: string;
    userId: ID;
    userType: TEndUserEnum;
  }): Promise<GroupOverviewDTO> {
    const groupDoc = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["schoolYears"],
    });

    if (userType === END_USER_ENUM.TEACHER && groupDoc.teacher !== userId)
      throw new BadRequestError("groupRules.teacherIsNotInGroup");

    return GroupMapper.toGroupOverviewDto(groupDoc);
  }
}
