import { injectable } from "inversify";
import { ListOptions } from "../../../types/types";
import { ClassroomRepo } from "../domains/classroom.repo";
import { ClassroomDTO } from "../dtos/Classroom.dto";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ClassroomMapper } from "../mappers/Classroom.mapper";
import { inject } from "../../../core/container/TypedContainer";

@injectable()
export class ListClassroomsUseCase {
  constructor(@inject("ClassroomRepo") private classroomRepo: ClassroomRepo) {}

  async execute(
    filter: { name?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ClassroomDTO>> {
    const classrooms = await this.classroomRepo.listClassrooms(
      {
        name: filter.name,
      },
      options,
    );

    return {
      docs: classrooms.docs.map(classroom => ClassroomMapper.toDTO(classroom)),
      meta: classrooms.meta,
    };
  }
}
