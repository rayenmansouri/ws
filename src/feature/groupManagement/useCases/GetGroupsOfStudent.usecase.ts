import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { GroupRepo } from "../repos/Group.repo";
import { GroupMapper } from "../mappers/Group.mapper";
import { GroupDto } from "../dtos/Group.dto";

@injectable()
export class GetGroupsOfStudentUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {}

  async execute(studentNewId: string): Promise<GroupDto[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { groupIds } = await this.studentApplicationService.getCurrentAcademicDetails(student);
    const groups = await this.groupRepo.findManyByIdsOrThrow(groupIds, "notFound.group");

    const groupsDto = groups.map(GroupMapper.toGroupDto);
    return groupsDto;
  }
}
