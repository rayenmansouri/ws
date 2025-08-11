import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { ClassMapper } from "../mappers/Classes.mapper";
import { GroupDto } from "../dto/Group.dto";
import { ClassGroupRepo } from "../domain/classGroup.repo";

@injectable()
export class GetGroupsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
  ) {}

  async execute(classNewId: string): Promise<GroupDto[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["classGroups"],
    });

    return classDoc.classGroups.map(group => ClassMapper.toGroupDto(group));
  }
}
