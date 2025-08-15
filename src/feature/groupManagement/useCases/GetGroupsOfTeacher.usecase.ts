import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { GroupDto } from "../dtos/Group.dto";
import { GroupMapper } from "../mappers/Group.mapper";
import { GroupRepo } from "../repos/Group.repo";

type GetGroupsOfTeacherUseCaseInput = {
  teacher: Pick<Teacher, "_id" | "levels">;
  search?: string;
};

@injectable()
export class GetGroupsOfTeacherUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(data: GetGroupsOfTeacherUseCaseInput): Promise<GroupDto[]> {
    const { teacher } = data;

    const levels = await this.levelRepo.findManyByIdsOrThrow(teacher.levels, "notFound.level");

    const schoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const groups = await this.groupRepo.findByTeacherAndSchoolYears(teacher._id, schoolYearIds);

    const groupDtos = groups.map(group => GroupMapper.toGroupDto(group));

    return groupDtos;
  }
}
