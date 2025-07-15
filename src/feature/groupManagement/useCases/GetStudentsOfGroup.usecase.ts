import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { GroupMapper } from "../mappers/Group.mapper";
import { StudentInGroupDto } from "../dtos/StudentInGroup.dto";

@injectable()
export class GetStudentsOfGroupUseCase {
  constructor(@inject("GroupRepo") private groupRepo: GroupRepo) {}

  async execute(groupNewId: string): Promise<StudentInGroupDto[]> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["students"],
    });

    const students = group.students.map(student => GroupMapper.toStudentInGroupDto(student));

    return students;
  }
}
