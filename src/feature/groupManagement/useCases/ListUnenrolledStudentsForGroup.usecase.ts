import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { StudentRepo } from "../../students/domain/Student.repo";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";
import { GroupRepo } from "../repos/Group.repo";

type ListUnenrolledStudentsForGroupInput = {
  groupNewId: string;
  search?: string;
} & ListOptions;

@injectable()
export class ListUnenrolledStudentsForGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
  ) {}

  async execute(
    query: ListUnenrolledStudentsForGroupInput,
  ): Promise<ResponseWithPagination<UserProfileDTO>> {
    const { groupNewId, search, page, limit } = query;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const studentIds = group.students;
    const classTypeIds = group.classTypes;

    const students = await this.studentRepo.listStudents(
      { search, excludedIds: studentIds, classTypeIds },
      { page, limit },
    );

    const studentDtos = applyMapperToPaginatedResponse(students, UserMapper.toUserProfileDTO);
    return studentDtos;
  }
}
