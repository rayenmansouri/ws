import { injectable } from "inversify";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../domain/Student.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { StudentMapper } from "../mapper/Student.mapper";
import { StudentDto } from "../dtos/StudentList.dto";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

export type listStudentsUseCaseRequestDto = {
  search: string | undefined;
  gender: string | undefined;
  level: ID | undefined;
  classTypeNewIds: string[] | undefined;
  isArchived: boolean | undefined;
  isActive: boolean | undefined;
} & ListOptions;

@injectable()
export class ListStudentsUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(dto: listStudentsUseCaseRequestDto): Promise<ResponseWithPagination<StudentDto>> {
    const { classTypeNewIds, search, gender, level, isActive, isArchived } = dto;

    const classTypes = classTypeNewIds
      ? await this.classTypeRepo.findManyByNewIdsOrThrow(classTypeNewIds, "notFound.classType")
      : undefined;

    const classTypeIds = classTypes?.map(classType => classType._id);

    const students = await this.studentRepo.listStudents(
      { search, gender, level, classTypeIds, isArchived, isActive },
      { page: dto.page, limit: dto.limit },
    );

    const studentListDto = applyMapperToPaginatedResponse(students, StudentMapper.toStudentDto);

    return studentListDto;
  }
}
